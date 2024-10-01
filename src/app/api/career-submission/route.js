/* eslint-disable global-require */
import archiver from 'archiver'
import _get from 'lodash/get'
import _map from 'lodash/map'
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

async function uploadFile(fileName, fileContent, type, email) {
  try {
    // console.time(`${fileName}_zipFile`)
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
    // console.timeEnd(`${fileName}_zipFile`)

    // const sasUrl ="https://tamtest.blob.core.windows.net/arise2/cv_2024-08-28_12:42:24.zip?se=2024-08-29T05%3A42%3A24Z&sig=xZIeI8gHaQsFoykszMh2Wnk62%2FBstEklzERgNTKrbdI%3D&sp=w&sr=b&sv=2024-05-04"
    // console.time(`${fileName}_getSassUrl`)
    const genSassStart = performance.now()
    const res = await axios.post('/arise-career-api/v1/azure-file/generate-sas-url', {
      contentType: 'application/zip',
      uploadFormatType: type,
      email,
    })
    const genSassEnd = performance.now()
    appInsightsLogSuccess(res, `get sass url ${fileName} ${genSassEnd - genSassStart}ms`)
    // console.timeEnd(`${fileName}_getSassUrl`)

    const sasUrl = res.data.data.sas_url
    // eslint-disable-next-line no-useless-escape
    const match = sasUrl.match(/\/([^\/?]+)\?/)
    const zipFileName = match ? match[1] : null
    
    // console.time(`${fileName}_uploadFileToAzure`)
    const uploadAzureStart = performance.now()
    const response = await axios.put(sasUrl, blobBuffer, {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'application/zip',
      },
    })
    // console.timeEnd(`${fileName}_uploadFileToAzure`)
    const uploadAzureEnd = performance.now()
    appInsightsLogSuccess(response, `upload ${fileName} to azure in ${uploadAzureEnd - uploadAzureStart}ms`)
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

export async function POST(request) {
  // console.time('serverAPI')
  try {
    const {
      formData, fileData,
      // formData, fileName, fileContent, type, email,
    } = await request.json()
    const serverStart = performance.now()
    // Upload file
    // console.log(fileData, 'File data')
    // console.time('uploadAll')
    const uploadPromises = _map(fileData, async (d) => new Promise(async (resolve, reject) => {
      try {
        // Upload file
        // console.time(`${d.fileName}_uploadfile`)
        const response = await uploadFile(d.fileName, d.file, d.type, formData.email)
        // console.timeEnd(`${d.fileName}_uploadfile`)

        const result = await response.json()
        if (response.ok) {
          if (d.type === 'cv') {
            formData.cvFile = _get(result, 'response.fileName')
            formData.passwordCv = _get(result, 'response.password')
          } else {
            formData.portfolioFile = _get(result, 'response.fileName')
            formData.passwordPortfolio = _get(result, 'response.password')
          }
          resolve()
          // console.log('Upload success:', d.type, formData)
        } else {
          reject(result)
          // console.error('Failed to upload file:', result)
        }
      } catch (error) {
        reject(error)
      }
      // }
    }))
    await Promise.all(uploadPromises)
    // console.timeEnd('uploadAll')

    // submit form
    // console.time('submission')
    // const { data, err, success } = await careerSubmission(formData)
    const submisisonStart = performance.now()
    const response = await axios.post('/arise-career-api/v1/career-submission', { ...formData })
    const submissionEnd = performance.now()
    const data = _get(response, 'data')
    // console.timeEnd('submission')
    const serverEnd = performance.now()
    appInsightsLogSuccess(response, `career submission ${submissionEnd - submisisonStart}ms`)
    if (data.code === '200') {
      appInsightsLogSuccess(response, `call server api ${serverEnd - serverStart}ms`)
      // console.timeEnd('serverAPI')
      return new Response(
        JSON.stringify({
          message: 'Career submission success',
          response: {
            data,
            err: null,
            success: true,
          },
        }),
        { status: 200 },
      )
    }
    return new Response(
      JSON.stringify({
        message: 'Career submission fail',
        response: {
          data,
          err: data.message,
          success: false,
        },
      }),
      { status: 500 },
    )
  } catch (error) {
    appInsightsLogError(error, 'Error something went wrong')
    return new Response(
      JSON.stringify({ data: [], err: 'Error something went wrong', success: false }),
      { status: 500 },
    )
  }
}
