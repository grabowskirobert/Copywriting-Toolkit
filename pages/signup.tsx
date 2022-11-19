import React, { useState, useRef } from 'react'
import CustomCard from '../components/atoms/Card'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import CustomButton from '../components/atoms/Button'
import LoaderSpinner from '../components/atoms/LoaderSpinner'
import CenterScreen from '../components/atoms/CenterScreen'
import FormContainer from '../components/atoms/FormContainer'
import FormCell from '../components/atoms/FormCell'
import ErrorMessage from '../components/atoms/ErrorMessage'
import Input from '../components/atoms/Input'

function SignUp() {
  const emailRef: React.MutableRefObject<any> = useRef()
  const passwordRef: React.MutableRefObject<any> = useRef()
  const passwordConfirmRef: React.MutableRefObject<any> = useRef()
  const { signup, user } = useAuth()
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
      user && router.push('/') // TODO: Fix bug where during sign-up user data is remembered from last logged person
    } catch (e) {
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  return (
    <CenterScreen>
      <FormContainer>
        <CustomCard>
          <h2 className="text-center mb-4 text-lg">Sign up</h2>
          <ErrorMessage>{error && error}</ErrorMessage>
          <form onSubmit={handleSubmit}>
            <FormCell id="email">
              <label htmlFor="">Email</label>
              <Input type="email" ref={emailRef} required />
            </FormCell>
            <FormCell id="password">
              <label htmlFor="">Password</label>
              <Input type="password" ref={passwordRef} required />
            </FormCell>
            <FormCell id="password-confirm">
              <label htmlFor="">Password Confirmation</label>
              <Input type="password" ref={passwordConfirmRef} required />
            </FormCell>
            <LoaderSpinner
              visible={loading}
              wrapperClasses="flex justify-center my-4"
            />
            <CustomButton type="submit" hidden={loading}>
              Sign Up
            </CustomButton>
          </form>
        </CustomCard>
        <div className="w-full text-center mt-2">
          Already have an account?
          <Link href="/login">
            <a className="font-semibold ml-1">Log In</a>
          </Link>
        </div>
      </FormContainer>
    </CenterScreen>
  )
}

export default SignUp
