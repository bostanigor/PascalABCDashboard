import React from 'react'
import { useStore } from 'store'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { Card } from 'antd'
import { CardEntry, CardHeader } from 'components/cards'
import { DataTable } from 'components/tables'
import { getSolutions } from 'api'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { BooleanIcon } from 'components/boolean_icon'
import * as paths from 'utils/paths'

const solution_columns = [
  {
    title: <h1> Задача </h1>,
    key: 'task',
    render: (text: string, record: Solution) =>
      // <Link to={paths.taskPath(record.task.id.toString())}>
      record.task.name,
    // </Link>
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

// General admin panel insides layout
const ProfilePage = ({ route }: RouteConfigComponentProps) => {
  const history = useHistory()

  const { userData } = useStore('userData')
  if (userData?.is_admin) return <Redirect to={paths.studentsPath} />

  return (
    userData && (
      <div className="site-card-border-less-wrapper">
        <Card
          title={
            <CardHeader
              title={`Студент ${userData!.first_name} ${userData.last_name}`}
            />
          }
          style={{ height: '100vt', marginLeft: '10' }}
          headStyle={{ fontWeight: 'bold' }}
        >
          <CardEntry title="Имя" key={1}>
            {userData.first_name}
          </CardEntry>
          <CardEntry title="Фамилия" key={2}>
            {userData.last_name}
          </CardEntry>
          <CardEntry title="Имя пользователя" key={4}>
            {userData.username}
          </CardEntry>
          <CardEntry title="Группа" key={5}>
            {userData.group.name}
          </CardEntry>
          <CardEntry title="Решено задач" key={6}>
            {userData.completed_tasks_count}
          </CardEntry>
          <Link to={paths.updatePasswordPath}>Поменять пароль</Link>
          <DataTable
            columns={solution_columns}
            getMethod={getSolutions}
            onRow={(record) => {
              return {
                onClick: () => history.push(paths.solutionPath(record.id)),
              }
            }}
          />
        </Card>
      </div>
    )
  )
}

export default ProfilePage
