'use client'

import React, { useState, useEffect } from 'react'
import {
  Grid, Box, Flex, Image, ActionIcon,
} from '@mantine/core'
import propTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { getCaptchaID } from '@/services/career/captcha/genCaptchaID'
import { IconReload } from '@tabler/icons-react'
import { TextInput } from '../Input'
import { TextBody } from '../Typography'
import { InputNumber } from '../InputNumber'

function Captcha(props) {
  const {
    value = '',
    setCaptchaID = () => {},
    onChange = () => {},
    error = null,
    resetCaptchaOnError = null,
    width = '400px',
    loadCaptcha = false,
  } = props
  const [captchaID, setComponentCaptchaID] = useState()

  const handleGetCaptchaID = async () => {
    const { allData } = await getCaptchaID()
    setComponentCaptchaID(allData.captchaId)
    setCaptchaID(allData.captchaId)
  }

  useEffect(() => {
    if (loadCaptcha) {
      handleGetCaptchaID()
    }
  }, [loadCaptcha])

  useEffect(() => {
    if (resetCaptchaOnError) {
      handleGetCaptchaID()
    }
  }, [resetCaptchaOnError])

  return (
    !_isEmpty(captchaID) && (
    <Flex gap="sm" align="flex-start" direction="column" w={width}>
      <TextBody isCustomColor customColor="grayscale.7">Captcha *</TextBody>
      <Grid w="100%">
        <Grid.Col span={8}>
          <Image
            src={!_isEmpty(captchaID) && `${process.env.NEXT_PUBLIC_API_URL}/arise-career-api/v1/captcha/image/${captchaID}`}
            alt="captcha"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex align="center" h="100%">
            <ActionIcon
              onClick={handleGetCaptchaID}
            >
              <IconReload />
            </ActionIcon>
          </Flex>
        </Grid.Col>
      </Grid>
      <Box w="100%">
        <InputNumber
          value={value}
          label="Type the text display above:"
          size="md"
          allowLeadingZeros
          trimLeadingZeroesOnBlur={false}
          allowNegative={false}
          onChange={onChange}
          error={!!error}
          labelProps={{ c: 'grayscale.6' }}
        />
        <TextBody isCustomColor customColor="#9c0d0d" size="xs" mb="10px" style={{ minHeight: '24px', marginTop: 4 }}>
          {error || ' '}
        </TextBody>
      </Box>
    </Flex>
    )
  )
}

export default Captcha

Captcha.propTypes = {
  value: propTypes.string,
  setCaptchaID: propTypes.func,
  onChange: propTypes.func,
  error: propTypes.string,
  width: propTypes.string,
  loadCaptcha: propTypes.bool,
  resetCaptchaOnError: propTypes.bool,
}
