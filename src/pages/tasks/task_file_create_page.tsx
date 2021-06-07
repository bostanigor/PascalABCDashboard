import React, { useState } from 'react'
import { Button, Card, Form, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { createTasksByFile } from 'api'
import { Redirect, useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader } from 'components/cards'
import { useStore } from 'store'
import { InputForm } from 'components/input_form'
import jsonToFormData from 'json-form-data'

const { Item } = Form

export const TaskFileCreatePage = () => {
  const history = useHistory()
  const { userData } = useStore('userData')
  const [fileList, setFileList] = useState([] as any[])
  const beforeUpload = (file: any) => {
    setFileList([file])
    return false
  }

  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

  const onFinish = (values: any) => {
    values.file = values.file.file

    const data = jsonToFormData(
      { tasks: values },
      {
        mapping: (val) => {
          if (val === null && val === undefined) return String(val)
          switch (typeof val) {
            case 'boolean':
              return val ? '1' : '0'
            case 'number':
              return String(val)
            case 'string':
              return val === '' ? ' ' : val
            default:
              return val as any
          }
        },
      },
    )

    createTasksByFile(data)
      .then(({ data }) => {
        history.push(paths.tasksPath)
      })
      .catch(() => {})
  }

  return (
    <Card title={<CardHeader title={'Загрузить файл задач'} />}>
      <h1>Формат файла следующий:</h1>
      <p>{`"<Название задачи>" <Описание задачи до конца строки>`}</p>

      <InputForm name="tasks-create" onFinish={onFinish}>
        <Item name="file" label="Файл">
          <Upload
            name="file"
            beforeUpload={beforeUpload}
            maxCount={1}
            multiple
            showUploadList={{
              showRemoveIcon: false,
            }}
          >
            <Button icon={<UploadOutlined />}>Загрузить файл задач</Button>
          </Upload>
        </Item>
      </InputForm>
    </Card>
  )
}
