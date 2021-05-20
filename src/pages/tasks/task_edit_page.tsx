import React from 'react'
import { Form, Card } from 'antd'
import { TaskForm } from './task_form'
import { updateTask, useFetch, getTask, deleteTask } from 'api'
import { useHistory, useParams } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader } from 'components/cards'

export const TaskEditPage = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getTask, [id], {})
  const onFinish = (values: TaskCreateParams) => {
    updateTask(id, { task: values })
      .then(() => history.push(paths.taskPath(id)))
      .catch(() => {})
  }
  const onDeleteClick = () => {
    deleteTask(id)
      .then(() => history.push(paths.tasksPath))
      .catch(() => {})
  }
  return (
    data && (
      <Card
        title={
          <CardHeader
            title={`Изменить ${data.data?.name}`}
            onDeleteClick={onDeleteClick}
          />
        }
      >
        <TaskForm
          name="task-edit"
          onFinish={onFinish}
          initialData={data?.data}
        />
      </Card>
    )
  )
}
