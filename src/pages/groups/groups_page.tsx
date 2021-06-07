import React from 'react'
import { Card } from 'antd'
import { DataTable } from 'components/tables'
import { deleteGroups, getGroups } from 'api'
import * as paths from 'utils/paths'
import { useHistory, Link, Redirect } from 'react-router-dom'
import { FolderAddOutlined, UserAddOutlined } from '@ant-design/icons'
import { ActionsColumn } from 'components/tables/actions_column'
import { StyledTitle } from 'components/cards'
import { useStore } from 'store'

const filters = [
  {
    label: 'Название',
    key: 'name',
  },
]

const columns = [
  {
    title: <h1> Название </h1>,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Действия',
    key: 'action',
    render: (text: string, record: Group) => (
      <ActionsColumn
        record={record}
        showPath={paths.groupPath(record.id.toString())}
        editPath={paths.groupEditPath(record.id.toString())}
      />
    ),
  },
]

const batchActions = [
  {
    label: 'Удалить выбранное',
    onClick: (ids: string[]) => deleteGroups(ids),
  },
]

export const GroupsPage = () => {
  const history = useHistory()
  const { userData } = useStore('userData')
  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

  return (
    <Card
      bordered={false}
      title={
        <StyledTitle
          title="Группы"
          buttonsContents={
            <Link to={paths.groupCreatePath}>
              {<FolderAddOutlined />} Создать
            </Link>
          }
        />
      }
    >
      <DataTable
        columns={columns}
        getMethod={getGroups}
        filters={filters}
        batchActions={batchActions}
        onRow={(record) => {
          return {
            onClick: () => history.push(paths.groupPath(record.id)),
          }
        }}
      />
    </Card>
  )
}
