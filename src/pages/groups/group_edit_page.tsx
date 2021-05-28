import React from 'react'
import { Form, Card } from 'antd'
import { GroupForm } from './group_form'
import { updateGroup, useFetch, getGroup, deleteGroup } from 'api'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader } from 'components/cards'
import { useStore } from 'store'

export const GroupEditPage = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getGroup, [id], {})
  const { userData } = useStore('userData')
  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

  const onFinish = (values: GroupCreateParams) => {
    updateGroup(id, { group: values })
      .then(() => history.push(paths.groupPath(id)))
      .catch(() => {})
  }
  const onDeleteClick = () => {
    deleteGroup(id)
      .then(() => history.push(paths.groupsPath))
      .catch(() => {})
  }
  return (
    data && (
      <Card
        title={
          <CardHeader
            title={`Изменить ${data.data?.name}`}
            onDeleteClick={onDeleteClick}
          />
        }
      >
        <GroupForm
          name="group-edit"
          onFinish={onFinish}
          initialData={data?.data}
        />
      </Card>
    )
  )
}
