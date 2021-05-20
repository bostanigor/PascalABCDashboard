import React from 'react'
import { Form, Card } from 'antd'
import { StudentForm } from './student_form'
import { getStudent, updateStudent, useFetch, deleteStudent } from 'api'
import { useHistory, useParams } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader } from 'components/cards'

export const StudentEditPage = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getStudent, [id], {})

  const onFinish = (values: StudentCreateParams) => {
    updateStudent(id, { student: values })
      .then(() => history.push(paths.studentPath(id)))
      .catch(() => {})
  }

  const onDeleteClick = () => {
    deleteStudent(id)
      .then(() => history.push(paths.studentsPath))
      .catch(() => {})
  }

  return (
    data && (
      <Card
        title={
          <CardHeader
            title={`Изменить ${data.data?.first_name}`}
            onDeleteClick={onDeleteClick}
          />
        }
      >
        <StudentForm
          name="student-edit"
          onFinish={onFinish}
          isNew={false}
          initialData={data?.data}
        />
      </Card>
    )
  )
}
