import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@mantine/core'

function TextBody(props) {
  const {
    children,
    isCustomFontSize = false,
    customFontSize = '16px',
    isCustomColor = false,
    customColor = 'darkBlue.0',
    variant = 'primary',
    bold = false,
    indent = '0',
    ...other
  } = props

  const color = {
    primary: 'darkBlue.0',
    secondary: 'lightBlue.7',
  }
  const thisFontStyle = {
    fontFamily: bold ? 'KrungthaiFastBold' : 'KrungthaiFast',
    fontSize: {
      1: 16,
    },
  }

  return (
    <Text
      ff={thisFontStyle.fontFamily}
      fz={isCustomFontSize ? customFontSize : thisFontStyle.fontSize[1]}
      c={isCustomColor ? customColor : color[variant]}
      style={{
        textIndent: indent,
      }}
      {...other}
    >
      {children}
    </Text>
  )
}

TextBody.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  bold: PropTypes.bool,
  customFontSize: PropTypes.string,
  isCustomFontSize: PropTypes.bool,
  customColor: PropTypes.string,
  isCustomColor: PropTypes.bool,
  indent: PropTypes.string,
}

export default TextBody
