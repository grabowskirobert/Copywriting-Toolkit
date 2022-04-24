import React, { useState, useRef } from 'react'
import CustomCard from '../components/CustomCard'
import CustomButton from '../components/CustomButton'
import Link from 'next/link'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'

const SignupContainer = styled.div`
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
`

function Login() {
  const emailRef: React.MutableRefObject<any> = useRef()
  const passwordRef: React.MutableRefObject<any> = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(data: any): Promise<void> {
    data.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      router.push('/')
    } catch (e) {
      setError('Failed to log in')
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <SignupContainer>
      <CustomCard>
        <h2 className='text-center mb-4'>Log In</h2>
        <p>{error && error}</p>
        <form onSubmit={handleSubmit}>
          <div id='email'>
            <label htmlFor=''>Email</label>
            <input type='email' ref={emailRef} required />
          </div>
          <div id='password'>
            <label htmlFor=''>Password</label>
            <input type='password' ref={passwordRef} required />
          </div>
          <CustomButton type='submit' disabled={loading}>
            Login
          </CustomButton>
        </form>
        <div>
          <Link href='/forgot-password'>
            <a>Forgot password?</a>
          </Link>
        </div>
      </CustomCard>
      <div className='w-full text-center mt-2'>
        Need an account?
        <Link href='/signup'>
          <a>Sign up</a>
        </Link>
      </div>
    </SignupContainer>
  )
}

export default Login
