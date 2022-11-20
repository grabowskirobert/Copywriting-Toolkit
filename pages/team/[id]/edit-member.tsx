import { useRouter } from 'next/router'
import React from 'react'
import EditMemberForm from '../../../components/organisms/EditMemberForm'
import { useTeamMembers } from '../../../hooks/useTeamMembers'
import Layout from '../../../layouts/Layout'
import privateRoute from '../../../layouts/PrivateRoute'


const EditMember = () => {
  const router = useRouter()
  const { id } = router.query
  const { allMembers } = useTeamMembers()
  const member = allMembers.filter((member) => member?.user?.uid === id)[0]
    ?.user

  return (
    <Layout>
     <EditMemberForm member={member} id={id}/> {/* id cannot be uid */}
    </Layout>
  )
}

export default privateRoute(EditMember)
