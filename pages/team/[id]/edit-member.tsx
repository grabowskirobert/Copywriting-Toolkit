import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import React from 'react'
import EditMemberForm from '../../../components/organisms/EditMemberForm'
import { getDocs, collection } from '@firebase/firestore'
import { useTeamMembers } from '../../../hooks/useTeamMembers'
import Layout from '../../../layouts/Layout'
import privateRoute from '../../../layouts/PrivateRoute'
import { db } from '../../../firebase/firebase'

const EditMember = () => {
  const router = useRouter()
  const { id } = router.query
  const { allMembers } = useTeamMembers()
  const member = allMembers.filter((member) => member?.user?.uid === id)[0]
    ?.user
  const [usersDoc, setUsersDoc] = useState<Array<any>>([])
  const usersCollection = collection(db, 'users')

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection)
      setUsersDoc(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()

    return () => {
      setUsersDoc([])
    }
  }, [])

  const userDocID = usersDoc.filter((user) => user.uid === id)[0]?.id

  return (
    <Layout>
      <EditMemberForm
        member={member}
        userDocID={userDocID}
      />
    </Layout>
  )
}

export default privateRoute(EditMember)
