import { setToken } from 'api'
import { createStoreon, StoreonModule } from 'storeon'
import * as hooks from 'storeon/react'

type State = { isSignedIn: boolean }

type Events = {
  signIn: { token: string }
  signOut: void
}

// Initial state, reducers and business logic are packed in independent modules
const baseStore: StoreonModule<State, Events> = (store) => {
  // Initial state
  store.on('@init', () => {
    const token = localStorage.getItem('token')
    setToken(token ?? null)
    return { isSignedIn: !!token }
  })

  store.on('signIn', (_, { token }) => {
    localStorage.setItem('token', token)
    setToken(token)
    return { isSignedIn: true }
  })

  store.on('signOut', (_) => {
    localStorage.removeItem('token')
    setToken(null)
    return { isSignedIn: false }
  })
}

/// type bound hook
/// use it instead of importing from storeon
export const useStore = (...keys: (keyof State)[]) =>
  hooks.useStoreon<State, Events>(...keys)

export const store = createStoreon([baseStore])
