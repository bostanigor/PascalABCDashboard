import React from 'react'
import { Card, Input, Form } from 'antd'
import { Redirect, useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader, StyledTitle } from 'components/cards'
import { createStudent, updatePassword } from 'api'
import { useStore } from 'store'
import { InputForm } from 'components/input_form'

const { Item } = Form

export const UpdatePasswordPage = () => {
  const history = useHistory()
  const { userData } = useStore('userData')

  const onFinish = (values: any) => {
    updatePassword(values.old_password, values.new_password)
      .then(() => {
        history.push(paths.studentsPath)
      })
      .catch(() => {})
  }

  return (
    <Card title={<CardHeader title={'Создать студента'} />}>
      <InputForm name={'update-password'} onFinish={onFinish}>
        <Item name="old_password" label="Старый пароль">
          <Input.Password />
        </Item>

        <Item name="new_password" label="Новый пароль">
          <Input.Password />
        </Item>
      </InputForm>
    </Card>
  )
}
