import React, { useMemo, useState } from 'react'
import { Empty, Spin, Table, TableProps } from 'antd'
import { useFetch } from 'api'
import { FilterType, TableFilters } from './table_filter'
import { BatchActions, BatchActionType } from './batch_actions'

type DataTableProps = {
  getMethod: (...arrgs: any) => Promise<ApiResponse<any, IndexPageMeta>>
  filters?: FilterType[]
  getParams?: any
  searchTerm?: string
  batchActions?: BatchActionType[]
} & TableProps<any>

export const DataTable = ({
  getMethod,
  filters,
  getParams,
  searchTerm,
  batchActions,
  ...props
}: DataTableProps) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filterData, setFilterData] = useState({})
  const [selectedRowsIds, setSelectedRowsIds] = useState([] as any[])
  const params = useMemo(() => {
    return { ...getParams, ...filterData }
  }, [getParams, filterData])
  const { data, isLoading, refetch } = useFetch(getMethod, [
    page,
    pageSize,
    params,
  ] as any)

  const rowSelection = batchActions
    ? {
        selectedRowsIds,
        onChange: (selectedRows: any[]) => setSelectedRowsIds(selectedRows),
      }
    : undefined

  return (
    <>
      {batchActions && (
        <BatchActions
          batchActions={batchActions}
          selectedRowsIds={selectedRowsIds}
          onFinish={refetch}
        />
      )}
      {filters && (
        <TableFilters filters={filters} setFilterData={setFilterData} />
      )}

      {isLoading ? (
        <Spin size="large" tip="Загрузка..." />
      ) : (
        <Table
          {...props}
          bordered={true}
          locale={{
            emptyText: (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Пусто" />
            ),
          }}
          dataSource={data?.data?.map((entry: any) => {
            return { key: entry.id, ...entry }
          })}
          rowSelection={rowSelection}
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
      )}
    </>
  )
}
