import React from 'react'
import { Card } from 'antd'
import { CardEntry, CardHeader } from 'components/cards'
import { RoleTag } from 'components/role_tag'
import { useFetch, getStudent, deleteStudent } from 'api'
import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'

export const StudentPage = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getStudent, [id])
  const onDeleteClick = () => {
    deleteStudent(id)
      .then(() => history.push(paths.studentsPath))
      .catch(() => {})
  }
  return (
    <div className="site-card-border-less-wrapper">
      {data?.data && (
        <Card
          title={
            <CardHeader
              title={`Студент ${data.data.first_name} ${data.data.last_name}`}
              editPath={paths.studentEditPath(id.toString())}
              onDeleteClick={onDeleteClick}
            />
          }
          style={{ height: '100vt', marginLeft: '10' }}
          headStyle={{ fontWeight: 'bold' }}
        >
          <CardEntry title="Имя" key={1}>
            {data.data.first_name}
          </CardEntry>
          <CardEntry title="Фамилия" key={2}>
            {data.data.first_name}
          </CardEntry>
          <CardEntry title="Дата рождения" key={3}>
            {data.data.birthdate}
          </CardEntry>
          <CardEntry title="Email" key={4}>
            {data.data.email}
          </CardEntry>
          <CardEntry title="Группа" key={5}>
            <Link to={paths.groupPath(data.data.group.id.toString())}>
              {data.data.group.name}
            </Link>
          </CardEntry>
        </Card>
      )}
    </div>
  )
}
