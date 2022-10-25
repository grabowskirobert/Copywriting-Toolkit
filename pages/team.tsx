import React from 'react'
import CustomButton from '../components/atoms/CustomButton'
import CustomCard from '../components/atoms/CustomCard'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../layouts/Layout'
import privateRoute from '../layouts/PrivateRoute'

const Team = () => {
  const { user } = useAuth()

  const TeamComponent = () => {
    if (user.team === '' && user.role === 'Admin') {
      return (
        <>
          <h2 className='text-center mb-4 text-xl'>Create your team</h2>
          <div className='mx-auto mt-4'>
            <CustomButton>Create Team</CustomButton>
          </div>
        </>
      )
    } else
      return (
        <>
          <h2 className='text-center mb-4 text-xl'>Your team</h2>
          <div>
            <span className='font-semibold pr-1'>Members: </span>
            {/* {user.email} */}
          </div>
          <div className='mx-auto mt-4'></div>
        </>
      )
  }
  return (
    <Layout>
      <div className='w-2/3 mx-auto'>
        <CustomCard>{TeamComponent()}</CustomCard>
      </div>
    </Layout>
  )
}

export default privateRoute(Team)
