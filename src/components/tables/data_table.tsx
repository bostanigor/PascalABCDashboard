import React, { useState } from 'react'
import { Table, TableProps } from 'antd'
import { useFetch } from 'api'

type DataTableProps = {
  getMethod: (...arrgs: any) => Promise<ApiResponse<any, IndexPageMeta>>
  getParams?: any
  searchTerm?: string
} & TableProps<any>

export const DataTable = ({
  getMethod,
  getParams,
  searchTerm,
  ...props
}: DataTableProps) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data } = useFetch(getMethod, [
    page,
    pageSize,
    getParams,
    searchTerm,
  ] as any)

  console.log(data?.meta)

  return (
    <Table
      {...props}
      bordered={true}
      dataSource={data?.data?.map((entry: any) => {
        return { key: entry.id, ...entry }
      })}
      pagination={{
        current: page,
        pageSize,
        total: data?.meta?.total_count,
        onChange: (nextPage, newPageSize) => {
          newPageSize && setPageSize(newPageSize)
          setPage(nextPage)
        },
      }}
      style={{ height: '100%', width: '100%' }}
    />
  )
}
