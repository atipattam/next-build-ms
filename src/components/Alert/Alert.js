'use client'

import React from 'react'
import { Alert as AlertComponent, Box } from '@mantine/core'
import { IconExclamationCircle } from '@tabler/icons-react'
import propTypes from 'prop-types'
import _get from 'lodash/get'
import classes from '@/styles/components/alert.module.css'

function Alert(props) {
  const {
    withCloseButton = true,
    title = '',
    description = '',
    icon = null,
    isCustom = false,
    variant = 'error',
    onClose = () => {},
  } = props

  const cf = {
    error: {
      icon: <IconExclamationCircle />,
      classes: {
        root: classes['root-error'],
        label: classes['label-error'],
        message: classes['message-error'],
        icon: classes['icon-error'],
        closeButton: classes['close-error'],
      },
    },
  }

  return (
    <Box>
      <AlertComponent
        radius="md"
        withCloseButton={withCloseButton}
        title={title}
        icon={!isCustom ? _get(cf, `${variant}.icon`, cf.error.icon) : icon}
        classNames={!isCustom && (_get(cf, `${variant}.classes`, cf.error.classes))}
        onClose={onClose}
      >
        {description}
      </AlertComponent>
    </Box>
  )
}

export default Alert

Alert.propTypes = {
  withCloseButton: propTypes.bool,
  title: propTypes.string,
  description: propTypes.string,
  icon: propTypes.node,
  isCustom: propTypes.bool,
  variant: propTypes.oneOf(['error']),
  onClose: propTypes.func,
}
