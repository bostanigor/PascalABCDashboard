import React from 'react'
import { InputForm } from 'components/input_form'
import { Form, Input } from 'antd'

type TaskFormProps = {
  initialData?: Task
  onFinish: (values: any) => void
  name: string
}

const { Item } = Form

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onFinish,
  name,
}) => {
  return (
    <InputForm name={name} onFinish={onFinish} initialValues={initialData}>
      <Item
        name="name"
        label="Название"
        rules={[{ required: true, message: 'Введите, пожалуйста, название' }]}
      >
        <Input />
      </Item>
      <Item
        name="ref"
        label="Ключ"
        rules={[{ required: true, message: 'Введите, пожалуйста, ключ' }]}
      >
        <Input />
      </Item>
    </InputForm>
  )
}
