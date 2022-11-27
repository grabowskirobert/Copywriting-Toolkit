import Button from '../../components/atoms/Button'
import Task from '../../components/organisms/Task'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import TaskForm from '../../components/organisms/TaskForm'
import { collection, getDocs, doc, updateDoc } from '@firebase/firestore'
import privateRoute from '../../layouts/PrivateRoute'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../layouts/Layout'

const Index = () => {
    const [addTask, setAddTask] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [query, setQuery] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<string>('')
    const [tasks, setTasks] = useState<Array<any>>([])
    const { user } = useAuth()

    interface TaskProps {
        uid: string
        task_title: string
        date_start: string
        date_end: string
        keywords: Array<string>
        content: string
        status: string
        user: string
        master: string
        archival: boolean
    }

    const taskForm: TaskProps = {
        uid: user?.uid,
        task_title: '',
        date_start: '',
        date_end: '',
        keywords: [],
        content: '',
        status: '',
        user: '',
        master: user.email,
        archival: false,
    }

    const taskCollection = collection(db, 'tasks')

    useEffect(() => {
        const getTask = async () => {
            const data = await getDocs(taskCollection)
            setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getTask()

        return () => {
            setTasks([])
        }
    }, [reload])

    //TODO: make option to revert this
    const archiveTask = async (task_id: string) => {
        const taskDoc = doc(db, 'tasks', task_id)

        try {
            await updateDoc(taskDoc, {
                archival: true,
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Layout>
            <div className='w-3/5 mx-auto'>
                <div className='flex flex-col w-1/4 '>
                    <select
                        className='rounded'
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value=''>No filters</option>
                        <option value='active'>Active</option>
                        <option value='check'>To be checked</option>
                        <option value='finished'>Finished</option>
                    </select>
                </div>

                <div className='mt-8 shadow-lg rounded'>
                    <div className='flex justify-between border-b-2'>
                        <input
                            className='w-3/5 mr-auto rounded'
                            type='text'
                            placeholder='Search for a task'
                            onChange={(e) => setQuery(e.currentTarget.value)}
                        />
                        {user.role === 'Master' && (
                            <Button
                                onClick={() => {
                                    setAddTask(!addTask)
                                }}
                            >
                                Add task
                            </Button>
                        )}
                    </div>
                    {tasks
                        .filter((task: any) => task?.archival === false)
                        .filter((task: any) =>
                            user.role === 'Admin'
                                ? !!task
                                : user.role === 'Master'
                                ? task.uid?.includes(user?.uid)
                                : task.user?.includes(user?.email)
                        )
                        .filter((task: any) =>
                            statusFilter === ''
                                ? task.status.includes(statusFilter)
                                : task.status === statusFilter
                        )
                        .filter((el: any) =>
                            el.task_title
                                .toLocaleLowerCase()
                                .includes(query.toLocaleLowerCase())
                        )
                        .map((el) => (
                            <Task
                                {...el}
                                key={el.id}
                                archiveTask={() => archiveTask(el.id)}
                            />
                        ))}
                </div>
                {addTask && (
                    <TaskForm
                        taskCollection={taskCollection}
                        setReload={() => setReload(!reload)}
                        taskForm={taskForm}
                        closeWindow={() => {
                            setAddTask(!addTask)
                        }}
                    />
                )}
            </div>
        </Layout>
    )
}

export default privateRoute(Index)
