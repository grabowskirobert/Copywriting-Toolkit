import React from 'react'
import { MdEdit } from 'react-icons/Md'
import Card from '../../components/atoms/Card'
import Divider from '../../components/atoms/Divider'
import { useTeamMembers } from '../../hooks/useTeamMembers'
import Layout from '../../layouts/Layout'
import privateRoute from '../../layouts/PrivateRoute'

const Team = () => {
  const { admins, copywriters, masters } = useTeamMembers()

  return (
    <Layout>
      <div className='w-2/5 mx-auto'>
        <Card>
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
        </Card>
      </div>
    </Layout>
  )
}

export default privateRoute(Team)
