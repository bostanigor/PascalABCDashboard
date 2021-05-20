import React from 'react'
import { Card } from 'antd'
import { DataTable } from 'components/tables'
import { getGroups } from 'api'
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

export const GroupsPage = () => {
  const history = useHistory()

  return (
    <Card
      bordered={false}
      title={
        <StyledTitle
          title="Группы"
          createButtonContent={
            <Link to={paths.groupCreatePath}>
              {<UserAddOutlined />} Создать
            </Link>
          }
        />
      }
    >
      <DataTable
        columns={columns}
        getMethod={getGroups}
        onRow={(record) => {
          return {
            onClick: () => history.push(paths.groupPath(record.id)),
          }
        }}
      />
    </Card>
  )
}
