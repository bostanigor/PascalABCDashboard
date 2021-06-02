import React, { useMemo, useState } from 'react'
import { Table, TableProps } from 'antd'
import { useFetch } from 'api'
import { FilterType, TableFilters } from './table_filter'

type DataTableProps = {
  getMethod: (...arrgs: any) => Promise<ApiResponse<any, IndexPageMeta>>
  filters?: FilterType[]
  getParams?: any
  searchTerm?: string
} & TableProps<any>

export const DataTable = ({
  getMethod,
  filters,
  getParams,
  searchTerm,
  ...props
}: DataTableProps) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filterData, setFilterData] = useState({})
  const params = useMemo(() => {
    return { ...getParams, ...filterData }
  }, [getParams, filterData])
  const { data } = useFetch(getMethod, [page, pageSize, params] as any)

  return (
    <>
      {filters && (
        <TableFilters filters={filters} setFilterData={setFilterData} />
      )}

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
        style={{ height: '100%', width: '100%', marginTop: '5px' }}
      />
    </>
  )
}
