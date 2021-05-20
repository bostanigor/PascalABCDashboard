import React, { useMemo } from 'react'
import { Menu } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'
import { studentsPath, groupsPath, tasksPath } from 'utils/paths'
import {
  UserOutlined,
  ShoppingOutlined,
  BgColorsOutlined,
  ShopOutlined,
  QuestionOutlined,
  PoundOutlined,
  FileDoneOutlined,
  FolderFilled,
  FolderOutlined,
} from '@ant-design/icons'

const useMenuKeys = () => {
  const studentsMatch = useRouteMatch(studentsPath) ? studentsPath : null
  const groupsMatch = useRouteMatch(groupsPath) ? groupsPath : null
  const tasksMatch = useRouteMatch(tasksPath) ? tasksPath : null

  return useMemo(() => {
    const keys = []
    studentsMatch && keys.push(studentsPath)
    groupsMatch && keys.push(groupsPath)
    tasksMatch && keys.push(tasksPath)

    return keys
  }, [studentsMatch, groupsMatch, tasksMatch])
}

export const SideMenu: React.FC<{}> = () => {
  return (
    <Menu theme="dark" mode="inline" selectedKeys={useMenuKeys()}>
      <Menu.Item key={studentsPath} icon={<UserOutlined />}>
        <Link to={studentsPath}>Студенты</Link>
      </Menu.Item>
      <Menu.Item key={groupsPath} icon={<FolderOutlined />}>
        <Link to={groupsPath}>Группы</Link>
      </Menu.Item>
      <Menu.Item key={tasksPath} icon={<FileDoneOutlined />}>
        <Link to={tasksPath}>Задачи</Link>
      </Menu.Item>
    </Menu>
  )
}
