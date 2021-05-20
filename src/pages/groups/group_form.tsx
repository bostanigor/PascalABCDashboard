import React from 'react'
import { InputForm } from 'components/input_form'
import { Form, Input } from 'antd'

type GroupFormProps = {
  initialData?: Group
  onFinish: (values: any) => void
  name: string
}

const { Item } = Form

export const GroupForm: React.FC<GroupFormProps> = ({
  initialData,
  onFinish,
  name,
}) => {
  return (
    <InputForm name={name} onFinish={onFinish} initialValues={initialData}>
      <Item
        name="name"
        label="Название"
        rules={[{ required: true, message: 'Выберите, пожалуйста, название' }]}
      >
        <Input />
      </Item>
    </InputForm>
  )
}
