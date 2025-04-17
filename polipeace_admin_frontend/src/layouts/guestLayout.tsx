import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextProvider'

export default function guestLayout() {

  const {token} = useStateContext()

  if (token) {
    return <Navigate to='/' />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
