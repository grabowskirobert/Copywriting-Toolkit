import { collection, getDocs } from '@firebase/firestore'
import { db } from '../firebase/firebase'
import { useEffect, useState } from 'react'

interface membersProps {
    user?: {
        email?: string
        role?: string
        tasks?: Array<string>
        uid?: string
    }
    id?: string
}

export function useTeamMembers() {
    const [admins, setAdmins] = useState<Array<membersProps>>([])
    const [masters, setMasters] = useState<Array<membersProps>>([])
    const [copywriters, setCopywriters] = useState<Array<membersProps>>([])
    const [allMembers, setAllMembers] = useState<Array<membersProps>>([])

    useEffect(() => {
        const fetchMember = async () => {
            const res = await getDocs(collection(db, 'users'))
            const data = res.docs?.map((doc) => {
                return { user: doc.data(), id: doc.id }
            })

            const copywriters = data.filter(
                (member) => member.user.role === 'Copywriter'
            )

            const admins = data.filter((member) => member.user.role === 'Admin')

            const masters = data.filter(
                (member) => member.user.role === 'Master'
            )

            setCopywriters(copywriters)
            setAdmins(admins)
            setMasters(masters)
            setAllMembers(copywriters.concat(admins).concat(masters))
        }
        fetchMember()
    }, [])

    return { admins, masters, copywriters, allMembers }
}
