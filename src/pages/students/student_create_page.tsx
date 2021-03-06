import React from 'react'
import { Card } from 'antd'
import { StudentForm } from './student_form'
import { Redirect, useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader, StyledTitle } from 'components/cards'
import { createStudent } from 'api'
import { useStore } from 'store'

export const StudentCreatePage = () => {
  const history = useHistory()
  const { userData } = useStore('userData')

  const onFinish = (values: StudentCreateParams) => {
    createStudent({ student: values })
      .then(({ data }) => {
        data?.id
          ? history.push(paths.studentPath(data.id.toString()))
          : history.push(paths.studentsPath)
      })
      .catch(() => {})
  }

  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

  return (
    <Card title={<CardHeader title={'Создать студента'} />}>
      <StudentForm name="student-create" onFinish={onFinish} isNew={true} />
    </Card>
  )
}
