import React, { useEffect, useState } from 'react'
import { Button, Col, Breadcrumb, Layout, Row } from 'antd'
import { Redirect } from 'react-router'
import { useStore } from 'store'
import { profilePath, signInPath, studentsPath } from 'utils/paths'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { SideMenu } from 'components/side_menu'
import { ErrorToast } from 'components/error_toast'
import { Header } from 'antd/lib/layout/layout'
import { SignOut } from 'components/auth/sign_out'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { AppLayoutRoutes } from '../routes'
import * as paths from 'utils/paths'
import { Link } from 'react-router-dom'

const { Content, Sider, Footer } = Layout
const collapseWidthBreakpoint = 750

const checkShouldBeCollapsed = () => window.innerWidth < collapseWidthBreakpoint

// General admin panel insides layout
const AppLayout = ({ route }: RouteConfigComponentProps) => {
  const [isCollapsed, setIsCollapsed] = useState(checkShouldBeCollapsed())
  const { isSignedIn, userData, isLoading } = useStore(
    'isSignedIn',
    'userData',
    'isLoading',
  )
  const breadcrumbs = useBreadcrumbs(AppLayoutRoutes as any)

  // Collapse side menu on window width rescaling below breakpoint
  useEffect(() => {
    function handleResize() {
      setIsCollapsed(checkShouldBeCollapsed())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isLoading) return <div> LOADING </div>
  if (!isSignedIn) return <Redirect to={signInPath} />

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={isCollapsed}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
            height: 64,
          }}
        >
          <span style={{ fontSize: 25 }}>PascalABC.NET</span>
        </div>
        <SideMenu isAdmin={userData!.is_admin} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: '0 24px' }}>
          <Row>
            <Col
              flex="1"
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 15,
              }}
            >
              {/* <Breadcrumb
                separator=">"
                style={{
                  fontSize: 'large',
                }}
              >
                {breadcrumbs.map((b) => (
                  <Breadcrumb.Item key={b.key}>
                    <Link to={b.key}>{b.breadcrumb}</Link>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb> */}
            </Col>
            <Col flex="0.08">{userData?.username}</Col>
            <Col flex="0.08" offset="1">
              {isSignedIn && <SignOut />}
            </Col>
          </Row>
        </Header>
        <Content className="site-layout-background">
          {route && renderRoutes(route.routes)}
          <ErrorToast />
        </Content>
        <Footer style={{ textAlign: 'center', padding: '15px 50px' }}>
          PascalABC.NET
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout
