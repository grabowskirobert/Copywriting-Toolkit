import type { NextPage } from 'next'
import Link from 'next/link'
import CustomCard from '../components/CustomCard'
import CustomButton from '../components/CustomButton'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import privateRoute from '../components/privateRoute'

const Dashboard: NextPage = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const router = useRouter()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      router.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <>
      <CustomCard>
        <h2 className='text-center mb-4'>Profile</h2>
        <p>{error && error}</p>
        <strong>Email:</strong>
        {currentUser.email}
        <CustomButton>
          <Link href='/update-profile'>Update Profile</Link>
        </CustomButton>
      </CustomCard>
      <div className='w-full text-center mt-2'>
        <Link href='/signup' passHref>
          <CustomButton customFunction={handleLogout}>Log out</CustomButton>
        </Link>
      </div>
    </>
  )
}

export default privateRoute(Dashboard)
