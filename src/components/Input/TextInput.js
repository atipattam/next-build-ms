'use client'

import React from 'react'
import { TextInput as TextInputComponent } from '@mantine/core'
import '@mantine/core/styles/Input.css'
import propTypes from 'prop-types'

function TextInput(props) {
  const {
    label = '',
    placeholder = '',
    disabled = false,
    required = false,
    value = null,
    onChange = () => {},
    onBlur = () => {},
    error = null,
    size = 'lg',
    maxLength = null,
    ...other
  } = props

  return (
    <TextInputComponent
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      withAsterisk={required}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      size={size}
      autoComplete="off"
      inputMode="none"
      maxLength={maxLength}
      styles={{
        label: {
          marginBottom: '0.5rem',
          color: '#032953',
        },
        input: {
          fontSize: '1rem',
          fontWeight: 400,
          border: '2px solid var(--mantine-color-lightBlue-5)',
          borderRadius: '5px',
          color: 'fieldText',
        },
        required: { color: '#032953' },
        error: {
          fontSize: '1rem',
          position: 'absolute',
          color: '#9c0d0d',
        },
      }}
      {...other}
    />
  )
}

export default TextInput

TextInput.propTypes = {
  label: propTypes.string,
  placeholder: propTypes.string,
  disabled: propTypes.bool,
  required: propTypes.bool,
  value: propTypes.string,
  onChange: propTypes.func,
  onBlur: propTypes.func,
  error: propTypes.string,
  size: propTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  maxLength: propTypes.number,
}
