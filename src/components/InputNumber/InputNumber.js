import React from 'react'
import propTypes from 'prop-types'
import { NumberInput as InputNumberComponent } from '@mantine/core'

function InputNumber(props) {
  const {
    label = '',
    placeholder = '',
    disabled = false,
    required = false,
    value = null,
    onChange = () => {},
    onBlur = () => {},
    error = null,
    maxLength = null,
    allowLeadingZeros = true,
    trimLeadingZeroesOnBlur = false,
    allowNegative = true,
    ...other
  } = props

  return (
    <InputNumberComponent
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      withAsterisk={required}
      value={value}
      maxLength={maxLength}
      onChange={onChange}
      allowLeadingZeros={allowLeadingZeros}
      trimLeadingZeroesOnBlur={trimLeadingZeroesOnBlur}
      allowNegative={allowNegative}
      onBlur={onBlur}
      error={error}
      size="lg"
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

export default InputNumber

InputNumber.propTypes = {
  label: propTypes.string,
  placeholder: propTypes.string,
  disabled: propTypes.bool,
  required: propTypes.bool,
  value: propTypes.string,
  onChange: propTypes.func,
  onBlur: propTypes.func,
  maxLength: propTypes.number,
  error: propTypes.string,
  allowLeadingZeros: propTypes.bool,
  trimLeadingZeroesOnBlur: propTypes.bool,
  allowNegative: propTypes.bool,
}
