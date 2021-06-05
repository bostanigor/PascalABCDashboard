import React from 'react'
import { Button, Card, message, Popconfirm } from 'antd'
import { LineOutlined } from '@ant-design/icons'
import { CardEntry, CardHeader } from 'components/cards'
import { useFetch, getSettings, destroyAllAttempts } from 'api'
import { Redirect } from 'react-router'
import { useHistory } from 'react-router-dom'
import * as paths from 'utils/paths'
import { useStore } from 'store'

export const SettingsPage = () => {
  const history = useHistory()

  const { data, refetch } = useFetch(getSettings, [])
  const { userData } = useStore('userData')

  if (!userData?.is_admin) return <Redirect to={paths.profilePath} />

  const destroyAction = () => {
    destroyAllAttempts()
      .then(refetch)
      .finally(() => {
        message.success('Решения удалены')
      })
  }

  return (
    <div className="site-card-border-less-wrapper">
      {data?.data && (
        <>
          <Card
            title={
              <CardHeader
                title={`Настройки`}
                editPath={paths.settingsEditPath}
              />
            }
            style={{ height: '100vt', marginLeft: '10' }}
            headStyle={{ fontWeight: 'bold' }}
          >
            <CardEntry title="Интервал неуспешных попыток (в сек.)" key={1}>
              {data.data.retry_interval}
            </CardEntry>
            <CardEntry title="Лимит текста решений" key={2}>
              {data.data.code_text_limit || <LineOutlined />}
            </CardEntry>
            <CardEntry title="Количество решений" key={1}>
              {data.data.attempts_count}
            </CardEntry>
          </Card>
          <Popconfirm
            title="Вы уверены?"
            onConfirm={destroyAction}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="primary" style={{ margin: '20px' }}>
              Удалить все решения
            </Button>
          </Popconfirm>
        </>
      )}
    </div>
  )
}
