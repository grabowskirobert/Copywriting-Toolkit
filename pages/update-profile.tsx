import React, { useState, useRef } from 'react'
import Card from '../components/atoms/Card'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import Button from '../components/atoms/Button'
import privateRoute from '../layouts/PrivateRoute'
import Layout from '../layouts/Layout'
import FormContainer from '../components/atoms/FormContainer'
import FormCell from '../components/atoms/FormCell'
import Input from '../components/atoms/Input'

function UpdateProfile() {
  const emailRef: React.MutableRefObject<any> = useRef()
  const passwordRef: React.MutableRefObject<any> = useRef()
  const passwordConfirmRef: React.MutableRefObject<any> = useRef()
  const { user, updatePasswordAuth, updateEmailAuth } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleSubmit(data: any): void {
    data.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Password do not match')
    }

    const promises = []
    setLoading(true)
    setError('')
    if (emailRef.current.value !== user.email) {
      promises.push(updateEmailAuth(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePasswordAuth(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        router.push('/')
      })
      .catch(() => {
        setError('Failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Layout>
      <FormContainer className='w-1/3'>
        <Card>
          <h2 className='text-center mb-4 text-xl'>Update Profile</h2>
          <p>{error && error}</p>
          <form onSubmit={handleSubmit}>
            <FormCell id='email'>
              <label htmlFor=''>Email</label>
              <Input
                type='email'
                innerRef={emailRef}
                required
                defaultValue={user.email}
              />
            </FormCell>
            <FormCell id='password'>
              <label htmlFor=''>Password</label>
              <Input
                type='password'
                innerRef={passwordRef}
                placeholder='Leave blank to keep the same'
              />
            </FormCell>
            <FormCell id='password-confirm'>
              <label htmlFor=''>Password Confirmation</label>
              <Input
                type='password'
                innerRef={passwordConfirmRef}
                placeholder='Leave blank to keep the same'
              />
            </FormCell>
            <Button
              type='submit'
              disabled={loading}
            >
              Update
            </Button>
            <Button
              className='m-4'
              disabled={loading}
            >
              <Link href='/'>
                <a>Cancel</a>
              </Link>
            </Button>
          </form>
        </Card>
      </FormContainer>
    </Layout>
  )
}

export default privateRoute(UpdateProfile)
