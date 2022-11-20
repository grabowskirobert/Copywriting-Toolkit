import { useRouter } from 'next/router'
import TaskForm from '../../../components/organisms/TaskForm'
import { db } from '../../../firebase/firebase'
import { getDoc, doc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import privateRoute from '../../../layouts/PrivateRoute'
import Layout from '../../../layouts/Layout'

const EditTask: any = () => {
  const router = useRouter()
  const { id } = router.query
  const [form, setForm] = useState<any>()

  useEffect(() => {
    const fetchTask = async (task_id: any) => {
      const taskDoc = doc(db, 'tasks', task_id)
      const data = await getDoc(taskDoc)
      const task = data.data()
      setForm(task)
    }
    fetchTask(id)
  })

  if (!form) return <p>Loading...</p>
  if (form)
    return (
      <Layout>
        <TaskForm
          update={true}
          taskForm={form}
          taskId={id}
        />
      </Layout>
    )
}

export default privateRoute(EditTask)
