import React, { useState, useRef } from 'react'
import CustomCard from '../components/atoms/CustomCard'
import CustomButton from '../components/atoms/CustomButton'
import Link from 'next/link'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import { FormContainer } from '../components/atoms/FormContainer'
import { FormCell } from '../components/atoms/FormCell'
import { StyledInput } from '../components/atoms/StyledInput'
import { ErrorMessage } from '../components/atoms/ErrorMessage'
import { CenterScreen } from '../components/atoms/CenterScreen'
import LoaderSpinner from '../components/atoms/LoaderSpinner'

function Login() {
  const emailRef: React.MutableRefObject<any> = useRef()
  const passwordRef: React.MutableRefObject<any> = useRef()
  const { login, user } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(data: any): Promise<void> {
    data.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      user && router.push('/')
    } catch (e) {
      setError('Failed to log in')
    }
    setLoading(false)
  }

  return (
    <CenterScreen>
      <FormContainer>
        <CustomCard>
          <h2 className='text-center mb-4 text-xl'>Log In</h2>
          <ErrorMessage>{error && error}</ErrorMessage>
          <form onSubmit={handleSubmit}>
            <FormCell id='email'>
              <label htmlFor=''>Email</label>
              <StyledInput type='email' ref={emailRef} required />
            </FormCell>
            <FormCell id='password'>
              <label htmlFor=''>Password</label>
              <StyledInput type='password' ref={passwordRef} required />
            </FormCell>
            <LoaderSpinner
              visible={loading}
              wrapperClasses='flex justify-center my-4'
            />
            <CustomButton type='submit' hidden={loading} className='m-4'>
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
      </FormContainer>
    </CenterScreen>
  )
}

export default Login
