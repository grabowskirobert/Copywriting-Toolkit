import { collection, getDocs } from '@firebase/firestore'
import { db } from '../firebase/firebase'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface membersProps {
  user?: {
    email?: string
    role?: string
    tasks?: Array<string>
    team?: string
    uid?: string
  }
  id?: string
}

export function useTeamMembers() {
  const { user } = useAuth()
  const [admin, setAdmin] = useState<Array<membersProps>>([])
  const [masters, setMasters] = useState<Array<membersProps>>([])
  const [copywriters, setCopywriters] = useState<Array<membersProps>>([])

  useEffect(() => {
    const fetchMember = async () => {
      const res = await getDocs(collection(db, 'users'))
      const data = res.docs?.map((doc) => {
        return { user: doc.data(), id: doc.id }
      })

      const copywriters = data.filter(
        (member) =>
          member.user.team === user.team && member.user.role === 'Copywriter'
      )

      const admin = data.filter(
        (member) =>
          member.user.team === user.team && member.user.role === 'Admin'
      )

      const masters = data.filter(
        (member) =>
          member.user.team === user.team && member.user.role === 'Master'
      )

      setCopywriters(copywriters)
      setAdmin(admin)
      setMasters(masters)
    }
    fetchMember()
  }, [])

  return { admin, masters, copywriters }
}
