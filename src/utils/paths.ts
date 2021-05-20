export const homePath = '/'
export const authPath = '/auth'
export const signInPath = authPath + '/sign_in'

export const dashboardPath = homePath + 'dashboard'

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
export const taskEditPath = (id: string) => `${tasksPath}/${id}/edit`

// // Collections
// export const collectionsPath = (brand_id: string) =>
//   brandPath(brand_id) + '/collections'
// export const collectionPath = (brand_id: string, id: string) =>
//   `${collectionsPath(brand_id)}/${id}`
// export const collectionCreatePath = (brand_id: string) =>
//   collectionsPath(brand_id) + '/create'
// export const collectionEditPath = (brand_id: string, id: string) =>
//   `${collectionsPath(brand_id)}/${id}/edit`
// // Product Images
// export const productImagesPath = (product_id: string) =>
//   `${productPath(product_id)}/images`
// export const productImagePath = (product_id: string, id: string) =>
//   `${productImagesPath(product_id)}/${id}`
// export const productImageCreatePath = (product_id: string) =>
//   `${productImagesPath(product_id)}/create`
// export const productImageEditPath = (product_id: string, id: string) =>
//   `${productImagePath(product_id, id)}/edit`

// // Sale Requests
// export const saleRequestsPath = homePath + 'sale_requests'
// export const saleRequestPath = (id: string) => `${saleRequestsPath}/${id}`
// export const saleRequestEditPath = (id: string) =>
//   `${saleRequestsPath}/${id}/edit`

// // Sale Request Images
// export const saleRequestImagesPath = (sale_request_id: string) =>
//   `${saleRequestPath(sale_request_id)}/images`
// export const saleRequestImagePath = (sale_request_id: string, id: string) =>
//   `${saleRequestImagesPath(sale_request_id)}/${id}`
// export const saleRequestImageCreatePath = (sale_request_id: string) =>
//   `${saleRequestImagesPath(sale_request_id)}/create`
// export const saleRequestImageEditPath = (sale_request_id: string, id: string) =>
//   `${saleRequestImagePath(sale_request_id, id)}/edit`

// // Orders
// export const ordersPath = homePath + 'orders'
// export const orderPath = (id: string) => `${ordersPath}/${id}`

// // Orders Products
// export const ordersProductsPath = (order_id: string) =>
//   orderPath(order_id) + '/orders_products'
// export const ordersProductPath = (order_id: string, id: string) =>
//   `${ordersProductsPath(order_id)}/${id}`
