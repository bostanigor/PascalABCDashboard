import React from 'react'
import { Form, Card, InputNumber } from 'antd'
import { useFetch, updateSettings, getSettings } from 'api'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import * as paths from 'utils/paths'
import { CardHeader } from 'components/cards'
import { useStore } from 'store'
import { InputForm } from 'components/input_form'

const { Item } = Form

export const SettingsEditPage = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { data } = useFetch(getSettings, [])
  const { userData } = useStore('userData')
  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

  const onFinish = (values: SettingsCreateParams) => {
    updateSettings({ settings: values })
      .then(() => history.push(paths.settingsPath))
      .catch(() => {})
  }

  return (
    data && (
      <Card title={<CardHeader title={`Изменить настройки`} />}>
        <InputForm
          name="settings-edit"
          onFinish={onFinish}
          initialValues={data?.data}
        >
          <Item
            name="retry_interval"
            label="Интервал попыток (в сек.)"
            rules={[
              { required: true, message: 'Введите, пожалуйста, интервал' },
            ]}
          >
            <InputNumber />
          </Item>
          <Item name="code_text_limit" label="Лимит текста решений">
            <InputNumber />
          </Item>
        </InputForm>
      </Card>
    )
  )
}
