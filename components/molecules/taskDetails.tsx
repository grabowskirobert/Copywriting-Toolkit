import React, { useState } from 'react'
import Button from '../atoms/Button'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'

interface Props {
    id: string
    deleteTask: () => any
    date_start: string
    date_end: string
}

export default function TaskDetails(props: Props) {
    const { user } = useAuth()
    const { id, deleteTask, date_start, date_end } = props
    const [deleteTaskConfirm, setDeleteTaskConfirm] = useState<boolean>(false)

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
            <div className='flex justify-end gap-3'>
                {(user.role === 'Admin' || user.role === 'Master') && (
                    <>
                        {!deleteTaskConfirm ? (
                            <Button
                                red
                                onClick={() => setDeleteTaskConfirm(true)}
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
                        <Button>
                            <Link href={`/tasks/${id}/edit`}>Edit details</Link>
                        </Button>
                    </>
                )}
                <Button>
                    <Link href={`/tasks/${id}`}>Go to the task</Link>
                </Button>
            </div>
        </>
    )
}
