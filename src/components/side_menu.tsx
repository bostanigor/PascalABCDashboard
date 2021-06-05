import React, { useMemo } from 'react'
import { Menu } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'
import {
  studentsPath,
  groupsPath,
  tasksPath,
  profilePath,
  settingsPath,
  attemptsPath,
  solutionsPath,
} from 'utils/paths'
import {
  UserOutlined,
  FileDoneOutlined,
  SettingOutlined,
  FolderOutlined,
} from '@ant-design/icons'

const useMenuKeys = () => {
  const studentsMatch = useRouteMatch([
    studentsPath,
    attemptsPath,
    solutionsPath,
  ])
    ? studentsPath
    : null
  const groupsMatch = useRouteMatch(groupsPath) ? groupsPath : null
  const tasksMatch = useRouteMatch(tasksPath) ? tasksPath : null
  const settingsMatch = useRouteMatch(settingsPath) ? settingsPath : null
  const profileMatch = useRouteMatch(profilePath) ? profilePath : null

  return useMemo(() => {
    const keys = []
    studentsMatch && keys.push(studentsPath)
    groupsMatch && keys.push(groupsPath)
    tasksMatch && keys.push(tasksPath)
    settingsMatch && keys.push(settingsPath)
    profileMatch && keys.push(profilePath)

    return keys
  }, [studentsMatch, groupsMatch, tasksMatch, settingsMatch, profileMatch])
}

type SideMenuProps = {
  isAdmin: boolean
}

export const SideMenu = ({ isAdmin }: SideMenuProps) => {
  return (
    <Menu theme="dark" mode="inline" selectedKeys={useMenuKeys()}>
      {isAdmin ? (
        <>
          <Menu.Item key={studentsPath} icon={<UserOutlined />}>
            <Link to={studentsPath}>Студенты</Link>
          </Menu.Item>
          <Menu.Item key={groupsPath} icon={<FolderOutlined />}>
            <Link to={groupsPath}>Группы</Link>
          </Menu.Item>
          <Menu.Item key={tasksPath} icon={<FileDoneOutlined />}>
            <Link to={tasksPath}>Задачи</Link>
          </Menu.Item>
          <Menu.Item key={settingsPath} icon={<SettingOutlined />}>
            <Link to={settingsPath}>Настройки</Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key={profilePath} icon={<UserOutlined />}>
            <Link to={profilePath}>Профиль</Link>
          </Menu.Item>
          <Menu.Item key={tasksPath} icon={<FileDoneOutlined />}>
            <Link to={tasksPath}>Задачи</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  )
}
