type Student = {
  id: number
  first_name: string
  last_name: string
  username: string
  completed_tasks_count: number
  group: Group
}

type Group = {
  id: number
  name: string
}

type Task = {
  id: number
  name: string
  rating: number
  successfull_attempts: number
  all_attempts: number
  description: string
}

type Solution = {
  id: number
  is_successfull: boolean
  task: Task
  student: Student
  attempts_count: number
  last_attempt_at: Date
}

type Attempt = {
  id: number
  status: string
  solution: Solution
  code_text: string
  created_at: Date
}

type Settings = {
  retry_interval: number
  code_text_limit: number
  attempts_count: number
}

type IndexPageMeta = {
  current_page: number
  next_page: number
  prev_page: number
  total_pages: number
  total_count: number
}

type StudentCreateParams = {
  first_name: string
  last_name: string
  username: string
  password: string
  group_id: string
}

type GroupCreateParams = {
  name: string
  file: any
}

type TaskCreateParams = {
  name: string
  description: string
}

type SettingsCreateParams = {
  retry_interval: number
  code_text_limit: number
}

type FetchData = {
  is_admin: boolean
} & Student

type ApiResponse<DataType = null, MetaType = undefined> = {
  data?: DataType
  error?: string
  meta?: MetaType
}

type SignIn = {
  token: string
}

type UseFetchOptions<Result, Variables> = {
  skip?: boolean
  initData?: Result
  mergeData?: (payload: {
    old_data: Result | null
    old_variables: Variables | null
    new_data: Result | null
    new_variables: Variables
    load_count: Number
  }) => Result | null
}

type fetchState<Result, Variables> = {
  data: Result | null
  params: Variables | null
  isLoading: boolean
  error: any | null
  load_count: Number
}

type fetchAction<Result, Variables> =
  | {
      type: 'data'
      data: Result
      params: Variables | null
    }
  | {
      type: 'loading'
    }
  | {
      type: 'error'
      error: any
    }
