import React from 'react'
import { Card } from 'antd'
import { DataTable } from 'components/tables'
import { getTasks } from 'api'
import * as paths from 'utils/paths'
import { useHistory, Link } from 'react-router-dom'
import { UserAddOutlined } from '@ant-design/icons'
import { ActionsColumn } from 'components/tables/actions_column'
import { StyledTitle } from 'components/cards'

const columns = [
  {
    title: <h1> Название </h1>,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <h1> Рейтинг </h1>,
    dataIndex: 'rating',
    key: 'rating',
  },
  {
    title: 'Действия',
    key: 'action',
    render: (text: string, record: Task) => (
      <ActionsColumn
        record={record}
        showPath={paths.taskPath(record.id.toString())}
        editPath={paths.taskEditPath(record.id.toString())}
      />
    ),
  },
]

export const TasksPage = () => {
  const history = useHistory()

  return (
    <Card
      bordered={false}
      title={
        <StyledTitle
          title="Задачи"
          createButtonContent={
            <Link to={paths.taskCreatePath}>{<UserAddOutlined />} Создать</Link>
          }
        />
      }
    >
      <DataTable
        columns={columns}
        getMethod={getTasks}
        onRow={(record) => {
          return {
            onClick: () => history.push(paths.taskPath(record.id)),
          }
        }}
      />
    </Card>
  )
}
