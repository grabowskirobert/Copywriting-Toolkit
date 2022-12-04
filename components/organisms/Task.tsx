import { RiArrowDownSLine } from 'react-icons/ri'
import { useState } from 'react'
import StatusDiode from '../atoms/StatusDiode'
import TaskDetails from '../molecules/TaskDetails'

interface TaskProps {
    id: string
    title: string
    start: string
    end: string
    deleteTask: () => void
    archiveTask: () => void
    revertTask: () => void
    status: 'active' | 'check' | 'finished'
    user: any
    master: any
}

const Task = ({
    id,
    title,
    start,
    end,
    deleteTask,
    archiveTask,
    revertTask,
    status,
    user,
    master,
}: TaskProps) => {
    const [showMore, setShowMore] = useState<boolean>(false)

    return (
        <div className='py-2 px-3.5 border-b-2'>
            <div
                className='relative cursor-pointer'
                onClick={() => setShowMore(!showMore)}
            >
                <div className='flex items-center gap-1'>
                    <StatusDiode status={status} />
                    <b>{title}</b>
                </div>
                <p className='font-semibold'>
                    Copywriter: <span className='font-normal'>{user}</span>
                </p>

                <p className='font-semibold'>
                    Master: <span className='font-normal'>{master}</span>
                </p>

                <RiArrowDownSLine
                    className='absolute top-2 right-1'
                    onClick={() => setShowMore(!showMore)}
                />
            </div>
            {showMore && (
                <TaskDetails
                    id={id}
                    deleteTask={deleteTask}
                    archiveTask={archiveTask}
                    revertTask={revertTask}
                    end={end}
                    start={start}
                />
            )}
        </div>
    )
}

export default Task
