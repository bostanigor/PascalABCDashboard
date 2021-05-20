import React from 'react'
import { ToastContainer } from 'react-toastify'

export const ErrorToast = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={7000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}
