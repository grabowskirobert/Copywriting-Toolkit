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

  return (
    <div className='w-2/3 mx-auto'>
      <CustomCard>
        <h2 className='text-center mb-4 text-xl'>Profile</h2>
        <p>{error && error}</p>
        <div>
          <span className='font-semibold pr-1'>Email:</span>
          {currentUser.email}
        </div>
        <div className='mx-auto'>
        <CustomButton>
          <Link href='/update-profile'>Update Profile</Link>
        </CustomButton>
        </div>
      </CustomCard>
    </div>
  )
}

export default privateRoute(Dashboard)
