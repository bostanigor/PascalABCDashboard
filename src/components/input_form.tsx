import React from 'react'
import { Form, Input, Button, Select, Space } from 'antd'
import { FormInstance, FormProps } from 'antd/lib/form'

type InputFormProps = {
  name: string
  initialValues?: any
  onFinish: (values: any) => void
}

const formItemLayout = {
  labelCol: {
    span: 5,
    offset: 0,
  },
  wrapperCol: {
    span: 7,
    offset: 0,
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    span: 10,
    offset: 5,
  },
}

export const InputForm: React.FC<InputFormProps> = ({
  children,
  name,
  onFinish,
  initialValues,
}) => {
  const [form] = Form.useForm()

  const onReset = () => {
    form.resetFields()
  }

  return (
    <Form
      form={form}
      name={name}
      size="large"
      initialValues={initialValues}
      onFinish={onFinish}
      {...formItemLayout}
      scrollToFirstError
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
      <Form.Item {...tailFormItemLayout}>
        <Space>
          <Button type="primary" htmlType="submit" size="large">
            Подтвердить
          </Button>
          <Button
            htmlType="button"
            type="primary"
            onClick={onReset}
            size="large"
            danger
          >
            Сброс
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
