import React, { useState, useRef } from 'react'
import CustomCard from '../components/CustomCard'
import Link from 'next/link'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from "next/router";
import CustomButton from '../components/CustomButton'
import privateRoute from '../components/privateRoute'

const SignupContainer = styled.div`
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
`

function UpdateProfile() {
  const emailRef: React.MutableRefObject<any> = useRef()
  const passwordRef: React.MutableRefObject<any> = useRef()
  const passwordConfirmRef: React.MutableRefObject<any> = useRef()
  const { currentUser,updatePasswordAuth,updateEmailAuth } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

   function handleSubmit(data: any):void {
    data.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
       setError('Password do not match')
    }

    const promises = []
    setLoading(true)
    setError('')
    if(emailRef.current.value !== currentUser.email) { 
        promises.push(updateEmailAuth(emailRef.current.value))
    }
    if (passwordRef.current.value){
        promises.push(updatePasswordAuth(passwordRef.current.value))
    }

    Promise.all(promises).then(()=> { 
        router.push('/')
    }).catch(()=> { 
        setError('Failed to update account')
    }).finally(()=> { 
        setLoading(false)
    })
  }

  return (
    <SignupContainer>
      <CustomCard>
        <h2 className='text-center mb-4'>Update Profile</h2>
        <p>{error && error}</p>
        <form onSubmit={handleSubmit}>
          <div id='email'>
            <label htmlFor=''>Email</label>
            <input type='email' ref={emailRef} required defaultValue={currentUser.email}/>
          </div>
          <div id='password'>
            <label htmlFor=''>Password</label>
            <input type='password' ref={passwordRef}  placeholder='Leave blank to keep the same'/>
          </div>
          <div id='password-confirm'>
            <label htmlFor=''>Password Confirmation</label>
            <input type='password' ref={passwordConfirmRef}  placeholder='Leave blank to keep the same'/>
          </div>
          <CustomButton type='submit' disabled={loading}>
            Update
          </CustomButton>
        </form>
      </CustomCard>
      <div className='w-full text-center mt-2'>
        <Link href='/'>
          <a>Cancel</a>
        </Link>
      </div>
    </SignupContainer>
  )
}

export default privateRoute(UpdateProfile)
