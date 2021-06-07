import React from 'react'
import { Card, Space } from 'antd'
import { DataTable } from 'components/tables'
import { deleteTasks, getTasks } from 'api'
import * as paths from 'utils/paths'
import { useHistory, Link } from 'react-router-dom'
import { FileAddOutlined, UserAddOutlined } from '@ant-design/icons'
import { ActionsColumn } from 'components/tables/actions_column'
import { StyledTitle } from 'components/cards'
import { useStore } from 'store'

const filters = [
  {
    label: 'Название',
    key: 'name',
  },
  {
    label: 'Описание',
    key: 'description',
  },
]

const columns = (isAdmin: boolean) => [
  {
    title: <h1> Название </h1>,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <h1> Рейтинг </h1>,
    dataIndex: 'rating',
    key: 'rating',
    render: (value: string) => <b>{value}</b>,
  },
  {
    title: 'Действия',
    key: 'action',
    render: (text: string, record: Task) => (
      <ActionsColumn
        record={record}
        showPath={paths.taskPath(record.id.toString())}
        editPath={
          isAdmin ? paths.taskEditPath(record.id.toString()) : undefined
        }
      />
    ),
  },
]

const batchActions = [
  {
    label: 'Удалить выбранное',
    onClick: (ids: string[]) => deleteTasks(ids),
  },
]

export const TasksPage = () => {
  const history = useHistory()
  const { userData } = useStore('userData')

  return (
    <Card
      bordered={false}
      title={
        <StyledTitle
          title="Задачи"
          buttonsContents={
            userData?.is_admin
              ? [
                  <Link to={paths.tasksFileCreatePath} key="create-tasks">
                    {<FileAddOutlined />} Создать группу задач
                  </Link>,
                  <Link to={paths.taskCreatePath} key="create-task">
                    {<FileAddOutlined />} Создать
                  </Link>,
                ]
              : null
          }
        />
      }
    >
      <DataTable
        columns={columns(userData!.is_admin)}
        filters={filters}
        batchActions={userData!.is_admin ? batchActions : undefined}
        getMethod={getTasks}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.description,
        }}
        onRow={(record) => {
          return {
            onClick: () => history.push(paths.taskPath(record.id)),
          }
        }}
      />
    </Card>
  )
}
