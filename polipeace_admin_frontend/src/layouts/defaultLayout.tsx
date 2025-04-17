import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextProvider'

export default function defaultLayout() {

  const {token} = useStateContext()

  if (!token) {
    return <Navigate to='/login'/>
  }

  return (
    <div>
      default
      <Outlet />
    </div>
  )
}
