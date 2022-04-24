import React, { useState, useRef } from 'react'
import CustomCard from '../components/CustomCard'
import Link from 'next/link'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from "next/router";
import CustomButton from '../components/CustomButton'

const SignupContainer = styled.div`
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
`

function SignUp() {
  const emailRef: React.MutableRefObject<any> = useRef()
  const passwordRef: React.MutableRefObject<any> = useRef()
  const passwordConfirmRef: React.MutableRefObject<any> = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(data: any): Promise<void> {
    data.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      router.push('/')
    } catch(e) {
      setError('Failed to create an account')
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <SignupContainer>
      <CustomCard>
        <h2 className='text-center mb-4'>Sign up</h2>
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
          <div id='password-confirm'>
            <label htmlFor=''>Password Confirmation</label>
            <input type='password' ref={passwordConfirmRef} required />
          </div>
          <CustomButton type='submit' disabled={loading}>
            Sign Up
          </CustomButton>
        </form>
      </CustomCard>
      <div className='w-full text-center mt-2'>
        Already have an account?
        <Link href='/login'>
          <a>Log In</a>
        </Link>
      </div>
    </SignupContainer>
  )
}

export default SignUp
