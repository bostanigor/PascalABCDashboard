import { Tag } from 'antd'
import React from 'react'
type StatusTagProps = {
  value: string
}
export const StatusTag = ({ value }: StatusTagProps) => {
  return <Tag color={value == 'success' ? 'green' : 'volcano'}>{value}</Tag>
}
