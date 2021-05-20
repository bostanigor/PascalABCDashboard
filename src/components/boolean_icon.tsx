import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React from 'react'
type BooleanIconProps = {
  value: boolean
}
export const BooleanIcon = ({ value }: BooleanIconProps) => {
  return value ? <CheckOutlined /> : <CloseOutlined />
}
