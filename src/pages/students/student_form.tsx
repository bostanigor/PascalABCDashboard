import React, { useMemo } from 'react'
import { InputForm } from 'components/input_form'
import { Select, Form, Input, DatePicker } from 'antd'
import { getGroups, useFetch } from 'api'
import { groupsPath } from 'utils/paths'
import moment from 'moment'

type StudentFormProps = {
  initialData?: Student
  onFinish: (values: any) => void
  isNew: boolean
  name: string
}

const { Item } = Form

export const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  onFinish,
  isNew,
  name,
}) => {
  const { data } = useFetch(getGroups, [])
  const groupsOptions = useMemo(() => data?.data?.map((group) => group), [data])

  const initData = {
    ...initialData,
    group_id: initialData?.group.id,
    user_attributes: { email: initialData?.username },
  }

  return (
    <InputForm name={name} onFinish={onFinish} initialValues={initData}>
      <Item name="first_name" label="Имя">
        <Input />
      </Item>
      <Item name="last_name" label="Фамилия">
        <Input />
      </Item>

      {groupsOptions && (
        <Item
          name="group_id"
          label="Группа"
          rules={[{ required: true, message: 'Выберите, пожалуйста, группу' }]}
        >
          <Select>
            {groupsOptions?.map((item) => (
              <Select.Option key={item.name} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Item>
      )}

      <Item
        name={['user_attributes', 'email']}
        label="Имя пользователя"
        rules={[
          { required: true, message: 'Выберите, пожалуйста, имя пользователя' },
        ]}
      >
        <Input />
      </Item>

      <Item
        name={['user_attributes', 'password']}
        label="Пароль"
        rules={[{ required: true, message: 'Введите, пожалуйста, пароль' }]}
      >
        <Input.Password />
      </Item>
    </InputForm>
  )
}
