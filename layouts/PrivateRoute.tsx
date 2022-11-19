import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { NextComponentType } from 'next'
import Login from '../pages/login'

function privateRoute<
  T extends JSX.IntrinsicAttributes & { children?: React.ReactNode }
>(Component: NextComponentType<T>) {
  const Route = (props: T) => {
    const { user } = useAuth()

    if (!user) {
      return <Login />
    }

    return <Component {...props} />
  }
  return Route
}

export default privateRoute
