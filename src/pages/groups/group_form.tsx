import React, { useState } from 'react'
import { InputForm } from 'components/input_form'
import { Button, Form, Input, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

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
  const [fileList, setFileList] = useState([] as any[])
  const beforeUpload = (file: any) => {
    setFileList([file])
    return false
  }

  return (
    <InputForm name={name} onFinish={onFinish} initialValues={initialData}>
      <Item
        name="name"
        label="Название"
        rules={[{ required: true, message: 'Выберите, пожалуйста, название' }]}
      >
        <Input />
      </Item>
      <Item name="file" label="Файл">
        <Upload
          name="file"
          beforeUpload={beforeUpload}
          maxCount={1}
          multiple
          showUploadList={{
            showRemoveIcon: true,
          }}
        >
          <Button icon={<UploadOutlined />}>Загрузить файл группы</Button>
        </Upload>
      </Item>
    </InputForm>
  )
}
