import React, { useState } from 'react'
import { Card, Button } from 'antd'
import { RoleTag } from 'components/role_tag'
import { DataTable } from 'components/tables'
import { getStudents, useFetch } from 'api'
import * as paths from 'utils/paths'
import { useHistory, Link } from 'react-router-dom'
import { UserAddOutlined } from '@ant-design/icons'
import { ActionsColumn } from 'components/tables/actions_column'
import { StyledTitle } from 'components/cards'

export const columns = [
  {
    title: <h1> Имя </h1>,
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: <h1> Фамилия </h1>,
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: <h1> Email </h1>,
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: <h1> Группа </h1>,
    key: 'group',
    render: (text: string, record: Student) => (
      <Link to={paths.groupPath(record.group.id.toString())}>
        {record.group.name}
      </Link>
    ),
  },
  {
    title: 'Действия',
    key: 'action',
    render: (text: string, record: Student) => (
      <ActionsColumn
        record={record}
        showPath={paths.studentPath(record.id.toString())}
        editPath={paths.studentEditPath(record.id.toString())}
      />
    ),
  },
]

export const StudentsPage = () => {
  const history = useHistory()

  return (
    <Card
      bordered={false}
      title={
        <StyledTitle
          title="Студенты"
          createButtonContent={
            <Link to={paths.studentCreatePath}>
              {<UserAddOutlined />} Создать
            </Link>
          }
        />
      }
    >
      <DataTable columns={columns} getMethod={getStudents} />
    </Card>
  )
}