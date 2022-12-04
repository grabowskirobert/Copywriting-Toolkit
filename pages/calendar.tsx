import React, { useEffect, useState } from 'react'
import privateRoute from '../layouts/PrivateRoute'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Layout from '../layouts/Layout'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '../firebase/firebase'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
require('react-big-calendar/lib/css/react-big-calendar.css')

const localizer = momentLocalizer(moment)

// Nie podpinam tego interface bo 'start' i 'end' to są stringi
// Korzystamy tylko z miesięcznęgo widoku więc wszystko działa bezbłędnie

// interface Event {
//     allDay?: boolean | undefined;
//     title?: React.ReactNode | undefined;
//     start?: Date | undefined;
//     end?: Date | undefined;
//     resource?: any;
// }

const taskCollection = collection(db, 'tasks')

const Calendar = () => {
    const { user } = useAuth()
    const [tasks, setTasks] = useState<Array<any>>([])
    const router = useRouter()

    useEffect(() => {
        const getTask = async () => {
            const data = await getDocs(taskCollection)
            setTasks(
                data.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                    .filter((task: any) => task?.archival === false)
                    .filter((task: any) =>
                        user.role === 'Admin'
                            ? !!task
                            : user.role === 'Master'
                            ? task.uid?.includes(user?.uid)
                            : task.user?.includes(user?.email)
                    )
            )
        }
        getTask()

        return () => {
            setTasks([])
        }
    }, [])

    return (
        <Layout>
            <BigCalendar
                localizer={localizer}
                events={tasks}
                startAccessor='start'
                endAccessor='end'
                style={{ height: 500 }}
                views={['month']}
                onSelectEvent={(task) => router.push(`/tasks/${task.id}`)}
                eventPropGetter={(event) => {
                    const newStyle = {
                        backgroundColor: '',
                    }

                    if (event.status === 'active') {
                        newStyle.backgroundColor = '#22c55e'
                    }
                    if (event.status === 'finished') {
                        newStyle.backgroundColor = '#f59e0b'
                    }
                    if (event.status === 'check') {
                        newStyle.backgroundColor = '#6366f1'
                    }

                    return {
                        style: newStyle,
                    }
                }}
            />
        </Layout>
    )
}

export default privateRoute(Calendar)
