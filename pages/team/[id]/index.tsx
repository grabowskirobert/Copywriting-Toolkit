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
import { Bar } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'

Chart.register(CategoryScale)

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const copyData = {
    labels: months,
    datasets: [
        {
            label: 'Characters with spaces',
            data: [
                17000, 14500, 22000, 18000, 20000, 13000, 17000, 14500, 22000,
                18000, 20000, 13000,
            ],
            backgroundColor: ['rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(153, 102, 255, 1)'],
            borderWidth: 1,
        },
    ],
}
const masterData = {
    labels: months,
    datasets: [
        {
            label: 'Checked tasks',
            data: [8, 10, 13, 7, 11, 15, 8, 10, 12, 11, 10, 9],
            backgroundColor: ['rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(153, 102, 255, 1)'],
            borderWidth: 1,
        },
    ],
}

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
                    {/* {member?.role === 'Copywriter' ||
                        (member?.role === 'Master' && (
                            <div>
                                <span className='font-semibold pr-1'>
                                    Tasks:
                                </span>
                                {!!member?.tasks
                                    ? 'Todo'
                                    : 'This user has currently no tasks.'}
                            </div>
                        ))} */}
                    {member?.role === 'Copywriter' && (
                        <Bar
                            data={copyData}
                            width={400}
                            height={200}
                        />
                    )}
                    {member?.role === 'Master' && (
                        <Bar
                            data={masterData}
                            width={400}
                            height={200}
                        />
                    )}

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
