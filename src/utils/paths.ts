export const homePath = '/'
export const authPath = '/auth'
export const signInPath = authPath + '/sign_in'

// Profile
export const profilePath = `${homePath}profile`

// Students
export const studentsPath = `${homePath}students`
export const studentPath = (id: string) => `${studentsPath}/${id}`
export const studentCreatePath = `${studentsPath}/create`
export const studentEditPath = (id: string) => `${studentsPath}/${id}/edit`

// Groups
export const groupsPath = `${homePath}groups`
export const groupPath = (id: string) => `${groupsPath}/${id}`
export const groupCreatePath = `${groupsPath}/create`
export const groupEditPath = (id: string) => `${groupsPath}/${id}/edit`

// Tasks
export const tasksPath = `${homePath}tasks`
export const taskPath = (id: string) => `${tasksPath}/${id}`
export const taskCreatePath = `${tasksPath}/create`
export const tasksFileCreatePath = `${tasksPath}/create_by_file`
export const taskEditPath = (id: string) => `${tasksPath}/${id}/edit`

// Solutions
export const solutionsPath = `${homePath}solutions`
export const solutionPath = (id: string) => `${solutionsPath}/${id}`

// Attempts
export const attemptsPath = `${homePath}attempts`
export const attemptPath = (id: string) => `${attemptsPath}/${id}`

// Misc
export const updatePasswordPath = `${homePath}update_password`

export const settingsPath = `${homePath}settings`
export const settingsEditPath = `${settingsPath}/edit`
