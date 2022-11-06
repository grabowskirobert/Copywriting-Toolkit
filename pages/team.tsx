import React, { useState } from 'react'
import CustomCard from '../components/atoms/CustomCard'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../layouts/Layout'
import privateRoute from '../layouts/PrivateRoute'
import TeamForm from '../components/molecules/TeamForm'
import CreateUser from '../components/organisms/CreateUser'
import { useTeamMembers } from '../hooks/useTeamMembers'
import Divider from '../components/atoms/Divider'
import CustomButton from '../components/atoms/CustomButton'

const Team = () => {
  const [showTeamForm, setShowTeamForm] = useState<boolean>(false)
  const [showUserCreation, setShowUserCreation] = useState<boolean>(false)
  const { user } = useAuth()
  const { admin, copywriters, masters } = useTeamMembers()

  const TeamComponent = () => {
    if (user.role === 'Admin' && user.team === '') {
      return (
        <>
          <h2 className='text-center mb-4 text-xl'>Create your team</h2>
          <div className='mx-auto mt-4'>
            <CustomButton customFunction={() => setShowTeamForm(!showTeamForm)}>
              Create Team
            </CustomButton>
          </div>
        </>
      )
    } else
      return (
        <>
          <h2 className='text-center mb-4 text-xl'>{user.team}</h2>
          <div>
            <span className='font-semibold pr-1'>Admin: </span>
            <br />
            {admin[0]?.user?.email}
            <Divider />
          </div>
          <div>
            <span className='font-semibold pr-1'>Masters: </span>
            {masters?.map((el, index) => {
              return (
                <div key={index}>
                  <p>
                    {el?.user?.email}
                    <Divider />
                  </p>
                </div>
              )
            })}
          </div>
          <div>
            <span className='font-semibold pr-1'>Copywriters: </span>
            {copywriters?.map((el, index) => {
              return (
                <div key={index}>
                  <p>
                    {el?.user?.email}
                    <Divider />
                  </p>
                </div>
              )
            })}
          </div>
          <div className='mx-auto mt-4'></div>
        </>
      )
  }

  return (
    <Layout>
      <div className='w-2/3 mx-auto'>
        <CustomCard>
          {TeamComponent()}
          {showTeamForm && <TeamForm setShow={setShowTeamForm} />}
          {user.role === 'Admin' && user.team !== '' && !showUserCreation && (
            <CustomButton
              customFunction={() => setShowUserCreation(!showUserCreation)}
              className="w-1/4 ml-auto"
            >
              Create user
            </CustomButton>
          )}
          {showUserCreation && <CreateUser setShowUserCreation={setShowUserCreation} />}
        </CustomCard>
      </div>
    </Layout>
  )
}

export default privateRoute(Team)
