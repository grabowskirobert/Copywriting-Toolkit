import { useState } from 'react'
import { db } from '../../firebase/firebase'
import { addDoc, doc, updateDoc } from '@firebase/firestore'
import { useRouter } from 'next/router'
import Button from '../atoms/Button'
import Card from '../atoms/Card'
import { useTeamMembers } from '../../hooks/useTeamMembers'
import Container from '../atoms/Container'

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
}

interface FormProps {
    taskForm: TaskProps
    update?: boolean
    setReload?: () => void
    closeWindow?: () => void
    taskCollection?: any
    taskId?: string | string[] | undefined
}

const TaskForm = ({
    taskForm,
    update = false,
    setReload,
    closeWindow,
    taskCollection,
    taskId,
}: FormProps) => {
    const router = useRouter()
    const { copywriters } = useTeamMembers()
    const [form, setForm] = useState({
        uid: taskForm.uid,
        task_title: taskForm.task_title,
        date_start: taskForm.date_start,
        date_end: taskForm.date_end,
        keywords: taskForm.keywords,
        content: taskForm.content,
        status: update ? taskForm.status : 'active',
        user: taskForm.user,
        master: taskForm.master,
    })
    function handleChange(e: any) {
        const { value, name } = e.target
        setForm((prevState: any) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const createTask = async (body: any) => {
        await addDoc(taskCollection, body)
        if (closeWindow !== undefined) {
            closeWindow()
        }
        if (setReload) {
            setReload()
        }
    }

    const updateTask = async (task_id: any, body: any) => {
        const taskDoc = doc(db, 'tasks', task_id)
        await updateDoc(taskDoc, body)
        router.back()
    }
    async function handleSubmit(e: any) {
        e.preventDefault()
        if (update) {
            await updateTask(taskId, form)
        } else if (!update) {
            await createTask(form)
        } else {
            console.error('Submit error')
        }
    }

    return (
        <>
            {update && <Button onClick={() => router.back()}>Return</Button>}
            <Container>
                <Card>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-1'
                    >
                        <label htmlFor='task_title'>Task title</label>
                        <input
                            type='text'
                            value={form.task_title}
                            onChange={handleChange}
                            required
                            name='task_title'
                        />
                        <label htmlFor='date_start'>Date start</label>
                        <input
                            type='date'
                            value={form.date_start}
                            onChange={handleChange}
                            required
                            name='date_start'
                        />
                        <label htmlFor='date_end'>Date end</label>
                        <input
                            type='date'
                            value={form.date_end}
                            onChange={handleChange}
                            required
                            name='date_end'
                        />
                        <label htmlFor='keywords'>Keywords</label>
                        <input
                            type='text'
                            value={form.keywords}
                            onChange={handleChange}
                            required
                            name='keywords'
                        />
                        <label htmlFor='user'>Copywriter</label>
                        <select
                            onChange={handleChange}
                            name='user'
                            value={form.user}
                            required
                        >
                            <option
                                value=''
                                hidden
                            >
                                Select user
                            </option>
                            {copywriters?.map((el, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={el?.user?.email}
                                    >
                                        {el?.user?.email}
                                    </option>
                                )
                            })}
                        </select>

                        <Button className='w-1/4 mx-auto'>
                            <input
                                type='submit'
                                value={update ? 'Update' : 'Create'}
                            />
                        </Button>
                        {!update && (
                            <Button
                                className='w-1/4 mx-auto'
                                onClick={() => {
                                    if (closeWindow !== undefined) {
                                        closeWindow()
                                    }
                                }}
                            >
                                Close
                            </Button>
                        )}
                    </form>
                </Card>
            </Container>
        </>
    )
}

export default TaskForm
