import React, { useState, useRef } from 'react'
import CustomCard from '../components/atoms/Card'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import FormContainer from '../components/atoms/FormContainer'

function ForgotPassword() {
  const emailRef: React.MutableRefObject<any> = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(data: any): Promise<void> {
    data.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch (e) {
      setError('Failed to reset password')
    }
    setLoading(false)
  }

  return (
    <FormContainer>
      <CustomCard>
        <h2 className='text-center mb-4'>Password Reset</h2>
        <p>{error && error}</p>
        <p>{message && message}</p>
        <form onSubmit={handleSubmit}>
          <div id='email'>
            <label htmlFor=''>Email</label>
            <input
              type='email'
              ref={emailRef}
              required
            />
          </div>
          <button
            type='submit'
            disabled={loading}
          >
            Reset Password
          </button>
        </form>
        <div>
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </div>
      </CustomCard>
      <div className='w-full text-center mt-2'>
        Need an account?
        <Link href='/signup'>
          <a>Sign up</a>
        </Link>
      </div>
    </FormContainer>
  )
}

export default ForgotPassword
