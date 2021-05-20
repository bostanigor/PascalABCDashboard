import React from 'react'
import { Card } from 'antd'
import { StudentForm } from './student_form'
import { useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader, StyledTitle } from 'components/cards'
import { createStudent } from 'api'

export const StudentCreatePage = () => {
  const history = useHistory()

  const onFinish = (values: StudentCreateParams) => {
    createStudent({ student: values })
      .then(({ data }) => {
        data?.id
          ? history.push(paths.studentPath(data.id.toString()))
          : history.push(paths.studentsPath)
      })
      .catch(() => {})
  }

  return (
    <Card title={<CardHeader title={'Создать студента'} />}>
      <StudentForm name="student-create" onFinish={onFinish} isNew={true} />
    </Card>
  )
}
