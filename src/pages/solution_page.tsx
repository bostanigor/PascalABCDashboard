import React from 'react'
import { Card } from 'antd'
import { CardEntry, CardHeader } from 'components/cards'
import {
  useFetch,
  getGroup,
  deleteGroup,
  getStudents,
  getSolution,
  getAttempts,
} from 'api'
import { Redirect, useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { ActionsColumn, DataTable } from 'components/tables'
import { columns as student_columns } from 'pages/students/students_page'
import { useStore } from 'store'
import { BooleanIcon } from 'components/boolean_icon'

const attempts_columns = [
  {
    title: <h1> Статус </h1>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <h1> Дата </h1>,
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Действия',
    key: 'action',
    render: (text: string, record: Attempt) => (
      <ActionsColumn
        record={record}
        showPath={paths.attemptPath(record.id.toString())}
      />
    ),
  },
]

export const SolutionPage = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getSolution, [id])

  return (
    <div className="site-card-border-less-wrapper">
      {data?.data && (
        <Card
          title={
            <CardHeader
              title={`Решения ученика ${data.data.student.first_name} ${data.data.student.last_name}`}
            />
          }
          style={{ height: '100vt', marginLeft: '10' }}
          headStyle={{ fontWeight: 'bold' }}
        >
          <CardEntry title="Задача" key={1}>
            <Link to={paths.taskPath(data.data.task.id.toString())}>
              {data.data.task.name}
            </Link>
          </CardEntry>
          <CardEntry title="Количество попыток" key={2}>
            {data.data.attempts_count}
          </CardEntry>
          <CardEntry title="Последняя попытка" key={3}>
            {data.data.last_attempt_at}
          </CardEntry>
          <CardEntry title="Выполнено" key={4}>
            <BooleanIcon value={data.data.is_successfull} />
          </CardEntry>

          <DataTable
            columns={attempts_columns}
            onRow={(record) => {
              return {
                onClick: () => history.push(paths.attemptPath(record.id)),
              }
            }}
            getMethod={getAttempts}
            getParams={{ solution_id: data.data.id }}
          />
        </Card>
      )}
    </div>
  )
}
