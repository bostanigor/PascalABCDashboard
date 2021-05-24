import React, { useEffect, useReducer } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { store, useStore } from 'store'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
require('dotenv').config()

const errorPrefix = (status: number) => {
  switch (status) {
    case 422:
      return 'Invalid Form Data: '
    case 403:
      return 'Access Denied: '
    default:
      return 'Error has occurred: '
  }
}

const invokeToast = (message: string | undefined) => {
  toast.error(message, {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

const API_URI = process.env.REACT_APP_API_URL
if (API_URI === undefined) {
  console.warn(process.env)
  console.warn('NO API URI SPECIFIED: check .env')
}
export const instance = axios.create({ baseURL: API_URI })

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isAxiosError) {
      // TODO: Fix no logout on wrong token
      const axios_error = error as AxiosError
      if (axios_error?.response?.data?.errors) {
        const message =
          errorPrefix(axios_error.response.status) +
          Object.entries(axios_error.response.data?.errors)
            .map((v) => {
              return `${v[0]} ${v[1]}`
            })
            .join(', ')
        invokeToast(message)
      } else if (axios_error?.response?.data?.error) {
        invokeToast(axios_error?.response?.data?.error)
      } else {
        invokeToast(axios_error.response?.statusText)
      }
    } else {
      invokeToast('Unknown error has occurred')
    }
    return Promise.reject(error)
  },
)

export const setToken = (token: string | null) => {
  instance.defaults.headers['Authorization'] = `Bearer ${token}`
}

export const signIn = (email: string, password: string) =>
  instance
    .post('/auth', {
      email,
      password,
    })
    .then((res) => {
      const body = res.data as ApiResponse<SignIn>
      if (body.data?.token) {
        store.dispatch('signIn', { token: body.data.token })
      }
      return res
    })

// Student requests
export const getStudents = (
  page?: string,
  pageSize?: string,
  filterParams?: StudentFilterParams,
) =>
  instance
    .get('/students', {
      params: {
        ...filterParams,
        page,
        per_page: pageSize,
      },
    })
    .then((res) => {
      return res.data as ApiResponse<Student[], IndexPageMeta>
    })

export const getStudent = (id: string) =>
  instance
    .get(`/students/${id}`)
    .then((res) => res.data as ApiResponse<Student>)

export const createStudent = (params: { student: StudentCreateParams }) =>
  instance
    .post('/students', params)
    .then((res) => res.data as ApiResponse<Student>)

export const updateStudent = (
  id: string,
  params: { student: StudentCreateParams },
) =>
  instance
    .put(`/students/${id}`, params)
    .then((res) => res.data as ApiResponse<Student>)

export const deleteStudent = (id: string) => instance.delete(`/students/${id}`)

// GROUPS
export const getGroups = (page?: string, pageSize?: string) =>
  instance
    .get('/groups', { params: { page, per_page: pageSize } })
    .then((res) => {
      return res.data as ApiResponse<Group[], IndexPageMeta>
    })

export const getGroup = (id: string) =>
  instance.get(`/groups/${id}`).then((res) => res.data as ApiResponse<Group>)

export const createGroup = (params: { group: GroupCreateParams }) =>
  instance.post('/groups', params).then((res) => res.data as ApiResponse<Group>)

export const updateGroup = (id: string, params: { group: GroupCreateParams }) =>
  instance
    .put(`/groups/${id}`, params)
    .then((res) => res.data as ApiResponse<Group>)

export const deleteGroup = (id: string) => instance.delete(`/groups/${id}`)

// TASKS
export const getTasks = (page?: string, pageSize?: string) =>
  instance
    .get('/tasks', { params: { page, per_page: pageSize } })
    .then((res) => {
      return res.data as ApiResponse<Task[], IndexPageMeta>
    })

export const getTask = (id: string) =>
  instance.get(`/tasks/${id}`).then((res) => res.data as ApiResponse<Task>)

export const createTask = (params: { task: TaskCreateParams }) =>
  instance.post('/tasks', params).then((res) => res.data as ApiResponse<Task>)

export const updateTask = (id: string, params: { task: TaskCreateParams }) =>
  instance
    .put(`/tasks/${id}`, params)
    .then((res) => res.data as ApiResponse<Task>)

export const deleteTask = (id: string) => instance.delete(`/tasks/${id}`)

export const getSolutions = (
  page?: string,
  pageSize?: string,
  filterParams?: StudentFilterParams,
) =>
  instance
    .get('/solutions', {
      params: {
        ...filterParams,
        page,
        per_page: pageSize,
      },
    })
    .then((res) => {
      return res.data as ApiResponse<Solution[], IndexPageMeta>
    })

/// useFetch hook
const fetchReducer = <Result, Variables>(
  state: fetchState<Result, Variables>,
  action: fetchAction<Result, Variables>,
) => {
  switch (action.type) {
    case 'data':
      return {
        data: action.data,
        error: null,
        isLoading: false,
        params: action.params,
      }
    case 'loading':
      return { ...state, isLoading: true, load_count: state.load_count }
    case 'error':
      return { isLoading: false, error: action.error }
  }
}

export const useFetch = <Result, Variables extends any[]>(
  fetchFunction: (...args: Variables) => Promise<Result>,
  variables: Variables,
  options?: UseFetchOptions<Result, Variables>,
) => {
  const [state, dispatch] = useReducer(fetchReducer as any, {
    data: options?.initData ?? null,
    isLoading: !options?.skip,
    error: null,
    params: null,
    load_count: 0,
  }) as any
  const fetchCycle = () => {
    if (options?.skip) return
    dispatch({ type: 'loading' })
    return fetchFunction(...variables).then(
      (data: Result) => {
        const mergedData = options?.mergeData
          ? options.mergeData({
              load_count: state.load_count,
              new_data: data,
              new_variables: variables,
              old_data: state.data,
              old_variables: state.params,
            })
          : data
        dispatch({ type: 'data', data: mergedData, params: variables })
        return mergedData
      },
      (e) => {
        dispatch({ type: 'error', error: e })
        return null
      },
    )
  }

  useEffect(() => {
    fetchCycle()
  }, [...variables, options?.skip ?? false])
  return { ...state, refetch: fetchCycle } as {
    data: Result | null
    error: any | null
    isLoading: boolean
    refetch: () => Promise<Result | null>
  }
}