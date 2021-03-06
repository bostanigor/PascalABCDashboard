import React from 'react'
import { Form, Input, Button } from 'antd'
import { signIn } from 'api'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

type SignInParams = { username: string; password: string }
export const SignIn = () => {
  const onFinish = ({ username, password }: SignInParams) => {
    return signIn(username, password).catch(() => {})
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="signIn"
      className="login-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: 'Введите, пожалуйста, имя пользователя' },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Имя пользователя"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Введите, пожалуйста, пароль' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}
