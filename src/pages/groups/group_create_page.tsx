import React from 'react'
import { Button, Card } from 'antd'
import { GroupForm } from './group_form'
import { createGroup } from 'api'
import { Redirect, useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader } from 'components/cards'
import { useStore } from 'store'
import jsonToFormData from 'json-form-data'

export const GroupCreatePage = () => {
  const history = useHistory()
  const { userData } = useStore('userData')
  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

  const onFinish = (values: any) => {
    values.file = values.file.file

    const data = jsonToFormData(
      { group: values },
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

    createGroup(data)
      .then(({ data }) => {
        data?.id
          ? history.push(paths.groupPath(data.id.toString()))
          : history.push(paths.groupsPath)
      })
      .catch(() => {})
  }

  const onFileUpload = () => {}
  return (
    <>
      <Card title={<CardHeader title={'Создать группу'} />}>
        <GroupForm name="group-create" onFinish={onFinish} />
      </Card>
    </>
  )
}
