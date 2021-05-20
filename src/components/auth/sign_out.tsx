import React from 'react'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import * as paths from 'utils/paths'
import { Link, Redirect } from 'react-router-dom'
import { store } from 'store'

export const SignOut = () => {
  const handleLogout = () => {
    store.dispatch('signOut')
  }
  return (
    <Link to={paths.signInPath}>
      <Button onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Button>
    </Link>
  )
}
