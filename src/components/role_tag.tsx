import React from 'react'
import { Tag } from 'antd'

type RoleTagProps = {
  role: string
}
export const RoleTag = ({ role }: RoleTagProps) => {
  return <Tag color={role == 'client' ? 'green' : 'red'}> {role} </Tag>
}
