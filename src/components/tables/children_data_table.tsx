import React, { useState } from 'react'
import { Table, TableProps } from 'antd'
import { useFetch } from 'api'

type ChildrenDataTableProps = {
  getMethod: (...aorrgs: any) => Promise<ApiResponse<any>>
  parent_id: string
} & TableProps<any>

export const ChildrenDataTable = ({
  getMethod,
  parent_id,
  ...props
}: ChildrenDataTableProps) => {
  const { data } = useFetch(getMethod, [parent_id], {})

  return (
    <Table
      {...props}
      bordered={true}
      dataSource={data?.data?.map((entry: any) => {
        return { key: entry.id, ...entry }
      })}
      style={{ height: '100%', width: '100%' }}
    />
  )
}
