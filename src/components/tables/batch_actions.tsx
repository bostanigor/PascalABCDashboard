import { Button, Popconfirm } from 'antd'
import React from 'react'

export type BatchActionType = {
  label: string
  onClick: (ids: any[]) => Promise<ApiResponse<any, IndexPageMeta>>
}

type BatchActionsProps = {
  batchActions: BatchActionType[]
  selectedRowsIds: any[]
  onFinish: () => Promise<ApiResponse<any, IndexPageMeta> | null>
}

export const BatchActions = ({
  batchActions,
  selectedRowsIds,
  onFinish,
}: BatchActionsProps) => {
  const hasSelected = selectedRowsIds.length > 0

  return (
    <>
      {batchActions.map((action) => {
        return (
          <Popconfirm
            title="Вы уверены?"
            onConfirm={() => {
              action.onClick(selectedRowsIds).then(onFinish)
            }}
            okText="Да"
            cancelText="Нет"
            key={action.label}
          >
            <Button
              type="primary"
              disabled={!hasSelected}
              style={{ marginBottom: '5px' }}
            >
              {action.label}
            </Button>
          </Popconfirm>
        )
      })}
    </>
  )
}
