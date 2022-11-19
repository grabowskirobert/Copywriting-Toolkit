import React from 'react'
import CustomCard from '../components/atoms/Card'
import Layout from '../layouts/Layout'
import privateRoute from '../layouts/PrivateRoute'
import { useTeamMembers } from '../hooks/useTeamMembers'
import Divider from '../components/atoms/Divider'
import { MdEdit } from 'react-icons/Md'

const Team = () => {
  const { admins, copywriters, masters } = useTeamMembers()

  return (
    <Layout>
      <div className='w-2/3 mx-auto'>
        <CustomCard>
          <h2 className='text-center mb-4 text-xl'>Your team</h2>
          <div>
            <span className='font-semibold pr-1'>Admins: </span>
            <br />
            {admins?.map((el, index) => {
              return (
                <div
                  key={index}
                  className='flex'
                >
                  <p>{el?.user?.email}</p>
                </div>
              )
            })}
          </div>
          <div>
            <Divider />

            <span className='font-semibold pr-1'>Masters: </span>
            {masters?.map((el, index) => {
              return (
                <div
                  key={index}
                  className='flex'
                >
                  <p>{el?.user?.email}</p>
                  <div className='ml-4 mt-1 pointer'>
                    <MdEdit />
                  </div>
                </div>
              )
            })}
          </div>
          <Divider />

          <div>
            <span className='font-semibold pr-1'>Copywriters: </span>
            {copywriters?.map((el, index) => {
              return (
                <div
                  key={index}
                  className='flex'
                >
                  <p>{el?.user?.email}</p>
                  <div className='ml-4 mt-1 pointer'>
                    <MdEdit />
                  </div>
                </div>
              )
            })}
          </div>
          <div className='mx-auto mt-4'></div>
        </CustomCard>
      </div>
    </Layout>
  )
}

export default privateRoute(Team)
