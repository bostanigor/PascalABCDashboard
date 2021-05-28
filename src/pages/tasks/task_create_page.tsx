import React from 'react'
import { Card } from 'antd'
import { TaskForm } from './task_form'
import { createTask } from 'api'
import { Redirect, useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader } from 'components/cards'
import { useStore } from 'store'

export const TaskCreatePage = () => {
  const history = useHistory()
  const { userData } = useStore('userData')
  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

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
