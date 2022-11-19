import CustomButton from '../../components/atoms/Button'
import Task from '../../components/organisms/Task'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import TaskForm from '../../components/organisms/TaskForm'
import { collection, getDocs, doc, deleteDoc } from '@firebase/firestore'
import privateRoute from '../../layouts/PrivateRoute'
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../layouts/Layout'

const Index = () => {
  const [addTask, setAddTask] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [task, setTask] = useState<Array<any>>([])
  const { user } = useAuth()

  interface TaskProps {
    uid: string
    task_title: string
    date_start: string
    date_end: string
    keywords: Array<string>
    content: string
    team: string
    status: string
  }

  const taskForm: TaskProps = {
    uid: user?.uid,
    task_title: '',
    date_start: '',
    date_end: '',
    keywords: [],
    content: '',
    team: '',
    status: '',
  }

  const taskCollection = collection(db, 'tasks')

  const deleteTask = async (id: any) => {
    const taskDoc = doc(db, 'tasks', id)
    await deleteDoc(taskDoc)
    setReload(!reload)
  }

  useEffect(() => {
    const getTask = async () => {
      const data = await getDocs(taskCollection)
      setTask(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getTask()

    return () => {
      setTask([])
    }
  }, [reload])

  return (
    <Layout>
      <div className="w-4/5 mx-auto">
        <div className="flex flex-col w-1/4 ">
          <select
            className="rounded"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="" hidden>
              Filters
            </option>
            <option value="active">Active</option>
            <option value="deadline">After deadline</option>
            <option value="check">To be checked</option>
            <option value="finished">Finished</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-4/5 mt-8 shadow-lg rounded">
          <div className="flex justify-between border-b-2">
            <input
              className="w-3/5 mr-auto rounded"
              type="text"
              placeholder="Search for a task"
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
            {(user.role === 'Admin' || user.role === 'Master') && (
              <CustomButton
                customFunction={() => {
                  setAddTask(!addTask)
                }}
              >
                Add task
              </CustomButton>
            )}
          </div>
          {task
            .filter((taskUser: any) =>
              user.role === 'Admin'
                ? taskUser.uid?.includes(user?.uid)
                : taskUser.user?.includes(user?.email)
            )
            .filter((taskUser: any) =>
              statusFilter === ''
                ? taskUser.status.includes(statusFilter)
                : taskUser.status === statusFilter
            )
            .filter((el: any) =>
              el.task_title
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase())
            )
            .map((el) => (
              <Task {...el} key={el.id} deleteTask={() => deleteTask(el.id)} />
            ))}
        </div>
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
    </Layout>
  )
}

export default privateRoute(Index)
