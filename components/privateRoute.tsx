import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { NextComponentType } from 'next'
import Login from '../pages/login'

function privateRoute<T>(Component:NextComponentType<T>) {
  const Route = (props:T) => {
    const { currentUser } = useAuth()

    if (!currentUser) {
        return <Login />
    }

    return <Component {...props} />
  }
  return Route
}

export default privateRoute
