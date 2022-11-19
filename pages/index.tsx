import type { NextComponentType } from 'next'
import Link from 'next/link'
import Card from '../components/atoms/Card'
import Button from '../components/atoms/Button'
import { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import privateRoute from '../layouts/PrivateRoute'
import Layout from '../layouts/Layout'

const Dashboard: NextComponentType<{ children?: ReactNode }> = () => {
  const { user } = useAuth()

  return (
    <Layout>
      <div className='w-2/5 mx-auto'>
        <Card>
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
            <Button>
              <Link href='/update-profile'>Update Profile</Link>
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default privateRoute(Dashboard)
