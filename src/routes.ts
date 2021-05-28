import React from 'react'
import { Redirect } from 'react-router'
import { RouteConfig } from 'react-router-config'
import * as paths from 'utils/paths'

// Auth view
import { Auth } from 'layouts/auth'
// Auth components
import { SignIn } from 'components/auth/sign_in'

import {
  StudentPage,
  StudentsPage,
  StudentCreatePage,
  StudentEditPage,
} from 'pages/students'
import {
  GroupsPage,
  GroupPage,
  GroupCreatePage,
  GroupEditPage,
} from 'pages/groups'
import { TasksPage, TaskPage, TaskCreatePage, TaskEditPage } from 'pages/tasks'
import ProfilePage from 'pages/profile_page'
import AppLayout from 'layouts/app_layout'

export const AdminRoutes: RouteConfig[] = [
  // Students
  {
    path: paths.studentsPath,
    exact: true,
    component: StudentsPage,
    breadcrumb: 'Студенты',
  },
  {
    path: paths.studentCreatePath,
    component: StudentCreatePage,
    breadcrumb: 'Создать',
  },
  { path: paths.studentPath(':id'), exact: true, component: StudentPage },
  {
    path: paths.studentEditPath(':id'),
    component: StudentEditPage,
    breadcrumb: 'Редактировать',
  },
  // Groups
  {
    path: paths.groupsPath,
    exact: true,
    component: GroupsPage,
    breadcrumb: 'Группы',
  },
  {
    path: paths.groupCreatePath,
    component: GroupCreatePage,
    breadcrumb: 'Создать',
  },
  { path: paths.groupPath(':id'), exact: true, component: GroupPage },
  {
    path: paths.groupEditPath(':id'),
    component: GroupEditPage,
    breadcrumb: 'Редактировать',
  },
  {
    path: paths.taskCreatePath,
    component: TaskCreatePage,
    breadcrumb: 'Создать',
  },
  { path: paths.taskPath(':id'), exact: true, component: TaskPage },
  {
    path: paths.taskEditPath(':id'),
    component: TaskEditPage,
    breadcrumb: 'Редактировать',
  },
]

export const StudentRoutes: RouteConfig[] = [
  {
    path: paths.profilePath,
    exact: true,
    component: ProfilePage,
    breadcrumb: 'Профиль',
  },
]

export const AppLayoutRoutes = [
  ...AdminRoutes,
  ...StudentRoutes,
  {
    path: paths.tasksPath,
    exact: true,
    component: TasksPage,
    breadcrumb: 'Задачи',
  },
]

export const routes: RouteConfig[] = [
  {
    component: Auth,
    path: paths.authPath,
    routes: [
      { path: paths.signInPath, component: SignIn },
      {
        component: () => {
          return React.createElement(Redirect, { to: paths.signInPath })
        },
      },
    ],
  },
  {
    component: AppLayout,

    routes: [
      ...AppLayoutRoutes,
      {
        component: () => {
          return React.createElement(Redirect, { to: paths.homePath })
        },
      },
    ],
  },
]
