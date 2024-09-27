'use client'

import React from 'react'
import _isEmpty from 'lodash/isEmpty'

function LogError({ err }) {
  if (!_isEmpty(err)) {
    console.log(err)
  }
  return (
    <div />
  )
}

export default LogError
