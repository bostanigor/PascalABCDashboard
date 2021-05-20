import React from 'react'
import { Card } from 'antd'
import { TaskForm } from './task_form'
import { createTask } from 'api'
import { useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader } from 'components/cards'

export const TaskCreatePage = () => {
  const history = useHistory()
  const onFinish = (values: TaskCreateParams) => {
    createTask({ task: values })
      .then(({ data }) => {
        data?.id
          ? history.push(paths.taskPath(data.id.toString()))
          : history.push(paths.tasksPath)
      })
      .catch(() => {})
  }
  return (
    <Card title={<CardHeader title={'Создать задачу'} />}>
      <TaskForm name="task-create" onFinish={onFinish} />
    </Card>
  )
}
