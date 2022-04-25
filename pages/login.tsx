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
            <input type='email' ref={emailRef} required className='block w-4/5 mx-auto'/>
          </div>
          <div id='password'>
            <label htmlFor=''>Password</label>
            <input type='password' ref={passwordRef} required className='block w-4/5 mx-auto'/>
          </div>
          <CustomButton type='submit' disabled={loading} className='m-4'>
            Login
          </CustomButton>
        </form>
        <div>
          <Link href='/forgot-password'>
            <a>Forgot password?</a>
          </Link>
        </div>
      </CustomCard>
      <div className='w-full text-center mt-4'>
        Need an account?
        <Link href='/signup'>
          <a className='font-semibold ml-1'>Sign up</a>
        </Link>
      </div>
    </SignupContainer>
  )
}

export default Login
