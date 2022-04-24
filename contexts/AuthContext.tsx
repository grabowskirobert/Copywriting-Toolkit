import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword
} from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { auth } from '../firebase/firebase'

const AuthContext = React.createContext('')

export function useAuth(): any {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: JSX.ElementChildrenAttribute) {
  const [currentUser, setCurrentUser] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() { 
   return signOut(auth)
  }

  function resetPassword(email:string) { 
    return sendPasswordResetEmail(auth,email)
  }

  function updateEmailAuth(email:string){
    return updateEmail(auth.currentUser!,email)
  }

  function updatePasswordAuth(password:string){
    return updatePassword(auth.currentUser!,password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: any = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmailAuth,
    updatePasswordAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
