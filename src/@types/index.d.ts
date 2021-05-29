type Student = {
  id: number
  first_name: string
  last_name: string
  email: string
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
  ref: string
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

type IndexPageMeta = {
  current_page: number
  next_page: number
  prev_page: number
  total_pages: number
  total_count: number
}

type StudentFilterParams = {
  group_id: number
}

type StudentCreateParams = {
  first_name: string
  last_name: string
  email: string
  password: string
  group_id: string
}

type GroupCreateParams = {
  name: string
  file: any
}

type TaskCreateParams = {
  name: string
  ref: string
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
