import React from 'react'
import { Card } from 'antd'
import { CardEntry, CardHeader } from 'components/cards'
import { useFetch, getTask, deleteTask } from 'api'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'

export const TaskPage = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getTask, [id])
  const onDeleteClick = () => {
    deleteTask(id)
      .then(() => history.push(paths.tasksPath))
      .catch(() => {})
  }
  return (
    <div className="site-card-border-less-wrapper">
      {data?.data && (
        <Card
          title={
            <CardHeader
              title={`Задача ${data.data.name}`}
              editPath={paths.studentEditPath(id.toString())}
              onDeleteClick={onDeleteClick}
            />
          }
          style={{ height: '100vt', marginLeft: '10' }}
          headStyle={{ fontWeight: 'bold' }}
        >
          <CardEntry title="Название" key={1}>
            {data.data.name}
          </CardEntry>
          <CardEntry title="Рейтинг" key={1}>
            {data.data.rating}
          </CardEntry>
          <CardEntry title="Ключ" key={1}>
            {data.data.ref}
          </CardEntry>
        </Card>
      )}
    </div>
  )
}
