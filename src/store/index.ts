import { fetchUser, setToken } from 'api'
import { createStoreon, StoreonModule } from 'storeon'
import * as hooks from 'storeon/react'

type State = {
  isSignedIn: boolean
  userData: FetchData | null
  isLoading: boolean
}

type Events = {
  signIn: { token: string }
  signOut: void
  fetchUser: { data: FetchData | undefined }
}

// Initial state, reducers and business logic are packed in independent modules
const baseStore: StoreonModule<State, Events> = (store) => {
  // Initial state
  store.on('@init', () => {
    const token = localStorage.getItem('token')
    setToken(token ?? null)
    if (token) {
      fetchUser().then(({ data }) => store.dispatch('fetchUser', { data }))
      return { isSignedIn: true, userData: null, isLoading: true }
    }
    return { isSignedIn: false, userData: null, isLoading: false }
  })

  store.on('signIn', (_, { token }) => {
    localStorage.setItem('token', token)
    setToken(token)
    fetchUser().then(({ data }) => store.dispatch('fetchUser', { data }))
    return { isSignedIn: true, isLoading: true }
  })

  store.on('signOut', (_) => {
    localStorage.removeItem('token')
    setToken(null)
    return { isSignedIn: false, userData: null, isLoading: false }
  })

  store.on('fetchUser', (_, { data }) => {
    return { isSignedIn: true, userData: data, isLoading: false }
  })
}

/// type bound hook
/// use it instead of importing from storeon
export const useStore = (...keys: (keyof State)[]) =>
  hooks.useStoreon<State, Events>(...keys)

export const store = createStoreon([baseStore])
