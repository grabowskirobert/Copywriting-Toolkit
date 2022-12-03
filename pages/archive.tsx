import { useEffect, useState } from 'react'
import Task from '../components/organisms/Task'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../layouts/Layout'
import privateRoute from '../layouts/PrivateRoute'
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from '@firebase/firestore'
import { db } from '../firebase/firebase'

const tasksCollection = collection(db, 'tasks')

const Archive = () => {
    const { user } = useAuth()
    const [tasks, setTasks] = useState<Array<any>>([])
    const [reload, setReload] = useState<boolean>(false)
    const [query, setQuery] = useState<string>('')

    const deleteTask = async (id: any) => {
        const taskDoc = doc(db, 'tasks', id)
        await deleteDoc(taskDoc)
        setReload(!reload)
    }

    const revertTask = async (task_id: string) => {
        const taskDoc = doc(db, 'tasks', task_id)

        try {
            await updateDoc(taskDoc, {
                archival: false,
            })
            setReload(!reload)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getTasks = async () => {
            const data = await getDocs(tasksCollection)
            setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getTasks()

        return () => {
            setTasks([])
        }
    }, [reload])

    return (
        <Layout>
            <div className='w-3/5 mx-auto'>
                <div className='mt-8 shadow-lg rounded'>
                    <div className='flex justify-between border-b-2'>
                        <input
                            className='w-3/5 mr-auto rounded'
                            type='text'
                            placeholder='Search for a task'
                            onChange={(e) => setQuery(e.currentTarget.value)}
                        />
                    </div>
                    {tasks
                        .filter((task: any) =>
                            user.role === 'Admin'
                                ? !!task
                                : user.role === 'Master'
                                ? task.uid?.includes(user?.uid)
                                : task.user?.includes(user?.email)
                        )
                        .filter((task: any) => task?.archival === true)
                        .filter((el: any) =>
                            el.task_title
                                .toLocaleLowerCase()
                                .includes(query.toLocaleLowerCase())
                        )
                        .map((el) => (
                            <Task
                                {...el}
                                key={el.id}
                                deleteTask={() => deleteTask(el.id)}
                                revertTask={() => revertTask(el.id)}
                            />
                        ))}
                </div>
            </div>
        </Layout>
    )
}

export default privateRoute(Archive)
