import { Space, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
type ActionsColumnProps = {
  record: any
  showPath: string
  editPath?: string
}

export const ActionsColumn = ({
  editPath,
  record,
  showPath,
}: ActionsColumnProps) => {
  return (
    <Space size="small">
      <Button type="default" size="small">
        <Link
          to={{
            pathname: showPath,
            state: { record },
          }}
        >
          Показать
        </Link>
      </Button>
      {editPath && (
        <Button
          type="default"
          size="small"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to={{
              pathname: editPath,
              state: { record },
            }}
          >
            Изменить
          </Link>
        </Button>
      )}
    </Space>
  )
}
