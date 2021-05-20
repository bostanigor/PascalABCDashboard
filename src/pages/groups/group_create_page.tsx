import React from 'react'
import { Card } from 'antd'
import { GroupForm } from './group_form'
import { createGroup } from 'api'
import { useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader } from 'components/cards'

export const GroupCreatePage = () => {
  const history = useHistory()
  const onFinish = (values: GroupCreateParams) => {
    createGroup({ group: values })
      .then(({ data }) => {
        data?.id
          ? history.push(paths.groupPath(data.id.toString()))
          : history.push(paths.groupsPath)
      })
      .catch(() => {})
  }
  return (
    <Card title={<CardHeader title={'Создать группу'} />}>
      <GroupForm name="group-create" onFinish={onFinish} />
    </Card>
  )
}
