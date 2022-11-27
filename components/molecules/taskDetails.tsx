import React, { useState } from 'react'
import Button from '../atoms/Button'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'

interface Props {
    id: string
    deleteTask: () => void
    archiveTask: () => void
    date_start: string
    date_end: string
}

export default function TaskDetails(props: Props) {
    const { user } = useAuth()
    const { id, archiveTask, deleteTask, date_start, date_end } = props
    const [buttonConfirm, setButtonConfirm] = useState<boolean>(false)
    const { pathname } = useRouter()

    return (
        <>
            <div className='my-5'>
                <p className='font-semibold'>
                    Date of start:
                    <span className='font-normal ml-1'>{date_start}</span>
                </p>
                <p className='font-semibold'>
                    Date of end:{' '}
                    <span className='font-normal ml-1'>{date_end}</span>
                </p>
            </div>
            {pathname === '/tasks' && (
                <div className='flex justify-end gap-3'>
                    {(user.role === 'Admin' || user.role === 'Master') && (
                        <>
                            {!buttonConfirm ? (
                                <Button
                                    red
                                    onClick={() => setButtonConfirm(true)}
                                >
                                    Move to archive
                                </Button>
                            ) : (
                                <Button
                                    red
                                    onClick={() => archiveTask()}
                                >
                                    Are you sure?
                                </Button>
                            )}
                            <Button>
                                <Link href={`/tasks/${id}/edit`}>
                                    Edit details
                                </Link>
                            </Button>
                        </>
                    )}
                    <Button>
                        <Link href={`/tasks/${id}`}>Go to the task</Link>
                    </Button>
                </div>
            )}
            {pathname === '/archive' && (
                <div className='flex justify-end gap-3'>
                    {!buttonConfirm ? (
                        <Button
                            red
                            onClick={() => setButtonConfirm(true)}
                        >
                            Delete task
                        </Button>
                    ) : (
                        <Button
                            red
                            onClick={() => deleteTask()}
                        >
                            Are you sure?
                        </Button>
                    )}
                    <Button
                        onClick={() =>
                            console.log('Revert archive task effect')
                        }
                    >
                        Revert task
                    </Button>
                </div>
            )}
        </>
    )
}
