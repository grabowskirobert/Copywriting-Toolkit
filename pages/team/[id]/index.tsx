import React, { useState } from 'react'
import Card from '../../../components/atoms/Card'
import Layout from '../../../layouts/Layout'
import { useRouter } from 'next/router'
import { useTeamMembers } from '../../../hooks/useTeamMembers'
import Button from '../../../components/atoms/Button'
import Link from 'next/link'
import { useAuth } from '../../../contexts/AuthContext'
import privateRoute from '../../../layouts/PrivateRoute'
import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '../../../firebase/firebase'

const Member = () => {
    const router = useRouter()
    const { id } = router.query
    const { allMembers } = useTeamMembers()
    const member = allMembers.filter((member) => member?.id === id)[0]?.user
    const { user } = useAuth()
    const [deleteUserConfirm, setDeleteUserConfirm] = useState(false)

    const deleteMember = async (id: any) => {
        const taskDoc = doc(db, 'users', id)
        await deleteDoc(taskDoc)

        router.push('/team')
    }

    return (
        <Layout>
            <Button>
                <Link href='/team'>Return</Link>
            </Button>
            <div className='w-2/5 mx-auto'>
                <Card>
                    <h2 className='text-center mb-4 text-xl'>
                        {member?.email}
                    </h2>
                    <div>
                        <span className='font-semibold pr-1'>Role:</span>
                        {member?.role}
                    </div>
                    {member?.role === 'Copywriter' ||
                        (member?.role === 'Master' && (
                            <div>
                                <span className='font-semibold pr-1'>
                                    Tasks:
                                </span>
                                {!!member?.tasks
                                    ? 'Todo'
                                    : 'This user has currently no tasks.'}
                            </div>
                        ))}

                    <div className='mx-auto mt-4 flex gap-2'>
                        {(member?.role === 'Copywriter' ||
                            member?.role === 'Master') &&
                            user.role === 'Admin' && (
                                <>
                                    <Button>
                                        <Link href={`/team/${id}/edit-member`}>
                                            Edit member
                                        </Link>
                                    </Button>
                                    <Button red>
                                        {!deleteUserConfirm ? (
                                            <div
                                                onClick={() =>
                                                    setDeleteUserConfirm(true)
                                                }
                                            >
                                                Delete member
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => deleteMember(id)}
                                            >
                                                Are you sure?
                                            </div>
                                        )}
                                    </Button>
                                </>
                            )}
                    </div>
                </Card>
            </div>
        </Layout>
    )
}

export default privateRoute(Member)
