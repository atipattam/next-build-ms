'use client'

import React, { useState } from 'react'
import {
  FileButton, Flex, Image, ActionIcon, Button,
} from '@mantine/core'
import propTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import _truncate from 'lodash/truncate'
import { TextBody } from '../Typography'
import style from '../../styles/components/uploadFile.module.css'

function UploadFile(props) {
  const {
    disabled = false,
    accept = 'application/pdf',
    limitFileSize = 5000000,
    onChange = () => {},
  } = props

  const [file, setFile] = useState()

  return (
    <Flex gap="md" justify="flex-start" align="center">
      <FileButton
        onChange={(value) => {
          if (value?.type !== accept) {
            setFile(null)
            onChange(value)
          } else if (value?.size > limitFileSize) {
            setFile(null)
            onChange(value)
          } else {
            setFile(value)
            onChange(value)
          }
        }}
        disabled={disabled}
        accept={accept}
      >
        {(buttonProps) => (
          <ActionIcon
            {...buttonProps}
            disabled={disabled}
            h="50"
            w="60"
            bd="2px solid darkBlue.0"
            className={style['upload-icon-container']}
          >
            <Flex justify="center">
              <Image
                src="/assets/img/career/banner/upload-icon.jpg"
                alt="Upload File"
                w="22px"
                h="22px"
              />
            </Flex>
          </ActionIcon>
        )}
      </FileButton>
      <TextBody display="flex" style={{ alignItems: 'center' }}>
        {_isEmpty(file?.name) ? 'No file chosen' : _truncate(file?.name, { length: 30 })}
        {_isEmpty(file?.name) ? null : (
          <Button
            bg="transparent"
            c="darkBlue.0"
            px="15px"
            styles={{
              label: {
                overflow: 'visible',
              },
            }}
            onClick={() => {
              setFile(null)
              onChange(null)
            }}
          >
            X
          </Button>
        )}
      </TextBody>
    </Flex>
  )
}

export default UploadFile

UploadFile.propTypes = {
  disabled: propTypes.bool,
  accept: propTypes.string,
  onChange: propTypes.func,
  limitFileSize: propTypes.number,
}
