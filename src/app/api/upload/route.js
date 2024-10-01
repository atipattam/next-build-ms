/* eslint-disable global-require */
import archiver from 'archiver'
import { appInsightsLogError, appInsightsLogSuccess } from '@/common/appInsightLog'
import axios from '../../../axios'

function uint8ArrayToHexString(uint8Array) {
  return Array.from(uint8Array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function encrypt(plainText) {
  const key = new TextEncoder().encode(process.env.NEXT_PUBLIC_SKEY)

  const nonce = crypto.getRandomValues(new Uint8Array(12))

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'AES-GCM' },
    false,
    ['encrypt'],
  )

  const encodedPlainText = new TextEncoder().encode(plainText)

  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce },
    cryptoKey,
    encodedPlainText,
  )

  const combinedData = new Uint8Array(nonce.length + encryptedData.byteLength)
  combinedData.set(nonce)
  combinedData.set(new Uint8Array(encryptedData), nonce.length)
  return uint8ArrayToHexString(combinedData)
}

async function genPassword() {
  let pass = ''
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      + 'abcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 1; i <= 32; i += 1) {
    const char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }

  return pass
}

export async function POST(request) {
  try {
    const {
      fileName, fileContent, type, email,
    } = await request.json()
    const fileBuffer = Buffer.from(fileContent, 'base64')

    const pwd = await genPassword()
    const password = await encrypt(pwd)

    // Create a pass-through stream for archiving with encryption
    // eslint-disable-next-line global-require
    if (!archiver.isRegisteredFormat('zip-encrypted')) {
      archiver.registerFormat('zip-encrypted', require('archiver-zip-encrypted'))
    }

    const archive = archiver('zip-encrypted', {
      zlib: { level: 8 },
      encryptionMethod: 'aes256',
      password: pwd,
    })

    archive.append(fileBuffer, { name: fileName })
    archive.finalize()

    const chunks = []
    // eslint-disable-next-line no-restricted-syntax
    for await (const chunk of archive) {
      chunks.push(chunk)
    }

    const blobBuffer = Buffer.concat(chunks)

    // const sasUrl ="https://tamtest.blob.core.windows.net/arise2/cv_2024-08-28_12:42:24.zip?se=2024-08-29T05%3A42%3A24Z&sig=xZIeI8gHaQsFoykszMh2Wnk62%2FBstEklzERgNTKrbdI%3D&sp=w&sr=b&sv=2024-05-04"

    const res = await axios.post('/arise-career-api/v1/azure-file/generate-sas-url', {
      contentType: 'application/zip',
      uploadFormatType: type,
      email,
    })

    const sasUrl = res.data.data.sas_url
    // eslint-disable-next-line no-useless-escape
    const match = sasUrl.match(/\/([^\/?]+)\?/)
    const zipFileName = match ? match[1] : null

    const response = await axios.put(sasUrl, blobBuffer, {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'application/zip',
      },
    })
    appInsightsLogSuccess(response, 'upload')
    return new Response(
      JSON.stringify({
        message: 'File uploaded successfully',
        response: {
          fileName: zipFileName,
          password,
        },
      }),
      { status: 200 },
    )
  } catch (error) {
    appInsightsLogError(error, 'Error zipping and uploading file:')
    return new Response(
      JSON.stringify({ error: 'Error zipping and uploading file' }),
      { status: 500 },
    )
  }
}
