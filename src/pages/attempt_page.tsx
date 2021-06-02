import React from 'react'
import { Card } from 'antd'
import { CardEntry, CardHeader } from 'components/cards'
import { useFetch, getAttempt } from 'api'
import { Redirect, useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { StatusTag } from 'components/status_tag'

export const AttemptPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getAttempt, [id])

  return (
    <div className="site-card-border-less-wrapper">
      {data?.data && (
        <Card
          title={
            <CardHeader
              title={`Решение задачи ${data.data.solution.task.name}`}
            />
          }
          style={{ height: '100vt', marginLeft: '10' }}
          headStyle={{ fontWeight: 'bold' }}
        >
          <CardEntry title="Задача" key={1}>
            <Link to={paths.taskPath(data.data.solution.task.id.toString())}>
              {data.data.solution.task.name}
            </Link>
          </CardEntry>
          <CardEntry title="Ученик" key={2}>
            <Link
              to={paths.studentPath(data.data.solution.student.id.toString())}
            >
              {`${data.data.solution.student.first_name} ${data.data.solution.student.last_name}`}
            </Link>
          </CardEntry>
          <CardEntry title="Статус" key={4}>
            <StatusTag value={data.data.status} />
          </CardEntry>
          <CardEntry title="Текст решения" key={4}>
            {data.data.code_text}
          </CardEntry>
        </Card>
      )}
    </div>
  )
}
