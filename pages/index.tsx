import type { NextComponentType } from 'next'
import Link from 'next/link'
import CustomCard from '../components/atoms/Card'
import CustomButton from '../components/atoms/Button'
import { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import privateRoute from '../layouts/PrivateRoute'
import Layout from '../layouts/Layout'

const Dashboard: NextComponentType<{ children?: ReactNode }> = () => {
  const { user } = useAuth()

  return (
    <Layout>
      <div className='w-2/3 mx-auto'>
        <CustomCard>
          <h2 className='text-center mb-4 text-xl'>Profile</h2>
          <div>
            <span className='font-semibold pr-1'>Email:</span>
            {user.email}
          </div>
          <div>
            <span className='font-semibold pr-1'>Role:</span>
            {user.role}
          </div>
          <div className='mx-auto mt-4'>
            <CustomButton>
              <Link href='/update-profile'>Update Profile</Link>
            </CustomButton>
          </div>
        </CustomCard>
      </div>
    </Layout>
  )
}

export default privateRoute(Dashboard)
