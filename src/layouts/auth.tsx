import React from 'react'
import { Redirect } from 'react-router'
import { Layout, Card } from 'antd'
import { useStore } from 'store'
import * as paths from 'utils/paths'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { ErrorToast } from 'components/error_toast'

const { Header, Content } = Layout

export const Auth = ({ route }: RouteConfigComponentProps) => {
  const { isSignedIn } = useStore('isSignedIn')
  if (isSignedIn) return <Redirect to={paths.studentsPath} />

  return (
    <Layout
      style={{
        overflow: 'auto',
        height: '100vh',
      }}
    >
      <Header>Аутентификация</Header>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="site-card-border-less-wrapper">
          <Card title="Вход в систему" style={{ width: 350 }}>
            {route && renderRoutes(route.routes)}
          </Card>
        </div>
        <ErrorToast />
      </Content>
    </Layout>
  )
}
