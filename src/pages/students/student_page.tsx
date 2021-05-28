import React from 'react'
import { Card } from 'antd'
import { CardEntry, CardHeader } from 'components/cards'
import { useFetch, getStudent, deleteStudent, getSolutions } from 'api'
import { Redirect, useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { DataTable } from 'components/tables'
import { BooleanIcon } from 'components/boolean_icon'
import { useStore } from 'store'

const solution_columns = [
  {
    title: <h1> Задача </h1>,
    key: 'task',
    render: (text: string, record: Solution) => (
      <Link to={paths.taskPath(record.task.id.toString())}>
        {record.task.name}
      </Link>
    ),
  },
  {
    title: <h1> Правильно </h1>,
    dataIndex: 'is_successfull',
    key: 'is_successfull',
    render: (data: boolean) => <BooleanIcon value={data} />,
  },
  {
    title: <h1> Количество попыток </h1>,
    dataIndex: 'attempts_count',
    key: 'attempts_count',
  },
  {
    title: <h1> Последняя попытка </h1>,
    dataIndex: 'last_attempt_at',
    key: 'last_attempt_at',
  },
]

export const StudentPage = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getStudent, [id])
  const { userData } = useStore('userData')

  const onDeleteClick = () => {
    deleteStudent(id)
      .then(() => history.push(paths.studentsPath))
      .catch(() => {})
  }

  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

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
            {data.data.last_name}
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
          <DataTable
            columns={solution_columns}
            getMethod={getSolutions}
            getParams={{ student_id: data.data.id }}
          />
        </Card>
      )}
    </div>
  )
}
