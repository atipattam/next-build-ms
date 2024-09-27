'use client'

import React from 'react'
import { Checkbox as CheckboxComponent } from '@mantine/core'
import '@mantine/core/styles/Input.css'
import propTypes from 'prop-types'

function Checkbox(props) {
  const {
    label = '',
    disabled = false,
    required = false,
    value = null,
    onChange = () => {},
    onBlur = () => {},
    error = null,
    size = 'lg',
  } = props

  return (
    <CheckboxComponent
      label={label}
      disabled={disabled}
      // withAsterisk={required}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      color="lightBlue.5"
      iconColor="black"
      size={size}
    />
  )
}

export default Checkbox

Checkbox.propTypes = {
  label: propTypes.string,
  disabled: propTypes.bool,
  required: propTypes.bool,
  value: propTypes.string,
  onChange: propTypes.func,
  onBlur: propTypes.func,
  error: propTypes.string,
  size: propTypes.string,
}
