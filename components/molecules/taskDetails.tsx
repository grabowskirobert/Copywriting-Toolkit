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

  return (
    <>
      <div className='my-5'>
        <p>Date of start: {date_start}</p>
        <p>Date of end: {date_end}</p>
      </div>
      <div className='flex justify-end gap-3'>
        {(user.role === 'Admin' || user.role === 'Master') && (
          <>
            <Button
              red
              onClick={() => deleteTask()}
            >
              Delete task
            </Button>
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
