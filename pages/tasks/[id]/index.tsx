import { useRouter } from 'next/router'
import Button from '../../../components/atoms/Button'
import privateRoute from '../../../layouts/PrivateRoute'
import { db } from '../../../firebase/firebase'
import { getDoc, doc, updateDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import { EditorProps } from 'react-draft-wysiwyg'
import dynamic from 'next/dynamic'
import Layout from '../../../layouts/Layout'
import clsx from 'clsx'
import LoaderSpinner from '../../../components/atoms/LoaderSpinner'
import { MdDone } from 'react-icons/md'
import { useAuth } from '../../../contexts/AuthContext'

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

function MyEditor() {
    const router = useRouter()
    const taskId: any = router.query.id
    const [editorState, setEditorState] = useState<any>(() =>
        EditorState.createEmpty()
    )
    const [task, setTask] = useState<any>()
    const handleKeyCommand = (command: string, editorState: any) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)

        if (newState) {
            setEditorState(newState)
            return 'handled'
        }

        return 'not-handled'
    }
    const [saveButtonElement, setSaveButtonElement] = useState<JSX.Element>(
        <span>Save</span>
    )
    const [readyToCheckElement, setReadyToCheckElement] = useState<JSX.Element>(
        <span>Ready to check</span>
    )
    const [notReadyToCheckElement, setNotReadyToCheckElement] =
        useState<JSX.Element>(<span>Not ready to check</span>)
    const [activeButtonElement, setActiveButtonElement] = useState<JSX.Element>(
        <span>Mark as active</span>
    )
    const [finishedButtonElement, setFinishedButtonElement] =
        useState<JSX.Element>(<span>Mark as finished</span>)
    const [revertButtonElement, setRevertButtonElement] = useState<JSX.Element>(
        <span>Revert to check state</span>
    )
    const { user } = useAuth()

    // const [html,setHtml] = useState<string>();

    const currentRawContent = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
    )

    const keywords = task?.keywords
        .split(' ')
        .filter((keyword: string) => keyword !== '')

    const currentText: () => string = () => {
        return editorState.getCurrentContent().getPlainText()
    }

    const currentCharacters = () => {
        return currentText().length
    }

    const keywordChecker = (keyword: string) => {
        if (currentText().includes(keyword)) {
            return true
        }
        return false
    }

    const saveText = async (task_id: string) => {
        const taskDoc = doc(db, 'tasks', task_id)
        setSaveButtonElement(
            <LoaderSpinner
                visible
                wrapperClasses='w-7'
            />
        )
        try {
            await updateDoc(taskDoc, {
                content: currentRawContent,
            })
        } catch (err) {
            setSaveButtonElement(<span>Try again</span>)
            console.log(err)
        }

        setSaveButtonElement(<MdDone className='w-7' />)
        setTimeout(() => {
            setSaveButtonElement(<span>Save</span>)
        }, 2000)
    }

    const changeStatus = async (task_id: string, newStatus: string) => {
        const taskDoc = doc(db, 'tasks', task_id)
        const Loader = (
            <LoaderSpinner
                visible
                wrapperClasses='w-7'
            />
        )
        const DoneIcon = <MdDone className='w-7' />

        if (newStatus === 'check') {
            user?.role === 'Copywriter' && setReadyToCheckElement(Loader)
            user?.role === 'Master' && setRevertButtonElement(Loader)
        }
        if (newStatus === 'active') {
            user?.role === 'Copywriter' && setNotReadyToCheckElement(Loader)
            user?.role === 'Master' && setActiveButtonElement(Loader)
        }
        if (newStatus === 'finished') {
            setFinishedButtonElement(Loader)
        }

        try {
            await updateDoc(taskDoc, {
                status: newStatus,
            })
        } catch (err) {
            console.log(err)
        }

        if (newStatus === 'check') {
            user?.role === 'Copywriter' && setReadyToCheckElement(DoneIcon)
            user?.role === 'Master' && setRevertButtonElement(DoneIcon)
        }
        if (newStatus === 'active') {
            user?.role === 'Copywriter' && setNotReadyToCheckElement(DoneIcon)
            user?.role === 'Master' && setActiveButtonElement(DoneIcon)
        }
        if (newStatus === 'finished') {
            setFinishedButtonElement(DoneIcon)
        }
    }

    useEffect(() => {
        const fetchTask = async (task_id: string) => {
            const taskDoc = doc(db, 'tasks', task_id)
            const data: any = await getDoc(taskDoc)
            const task = data.data()
            setTask(task)
            if (task.content) {
                setEditorState(() =>
                    EditorState.createWithContent(
                        convertFromRaw(JSON.parse(task.content))
                    )
                )
            } else {
            }
        }

        fetchTask(taskId.toString())
    }, [taskId])

    function uploadImageCallBack(file: string) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', 'https://api.imgur.com/3/image')
            xhr.setRequestHeader('Authorization', 'Client-ID XXXXX')
            const data = new FormData()
            data.append('image', file)
            xhr.send(data)
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText)
                resolve(response)
            })
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText)
                reject(error)
            })
        })
    }

    return (
        <Layout>
            <Button onClick={() => router.back()}>Return</Button>
            <div className='my-10'>
                <div className='border rounded'>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        handleKeyCommand={handleKeyCommand}
                        toolbar={{
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                            image: {
                                uploadCallback: uploadImageCallBack,
                                alt: { present: true, mandatory: true },
                            },
                        }}
                        editorClassName='p-3'
                    />
                </div>
            </div>
            <div className='border rounded mt-4 w-1/4 p-3'>
                <p className='font-semibold'>
                    Characters with spaces:
                    <span className='font-normal ml-1'>
                        {currentCharacters()}
                    </span>
                </p>
                <ol>
                    <p className='font-semibold'>Keywords: </p>
                    {keywords?.map(
                        (keyword: string | undefined, index: number) => {
                            return (
                                <p key={index}>
                                    <li
                                        className={clsx([
                                            keywordChecker(keyword!) &&
                                                'line-through',
                                        ])}
                                    >
                                        <span>
                                            {index + 1}. {keyword}
                                        </span>
                                    </li>
                                </p>
                            )
                        }
                    )}
                </ol>
            </div>
            <div className='flex gap-2'>
                {(task?.status === 'active' || task?.status === 'check') && (
                    <Button
                        onClick={() => saveText(taskId)}
                        className='w-14 h-10 flex justify-center items-center'
                    >
                        {saveButtonElement}
                    </Button>
                )}
                {task?.status === 'active' && user?.role === 'Copywriter' && (
                    <Button
                        onClick={() => changeStatus(taskId, 'check')}
                        className='w-36 h-10 flex justify-center items-center'
                    >
                        {readyToCheckElement}
                    </Button>
                )}
                {task?.status === 'check' && user?.role === 'Copywriter' && (
                    <Button
                        onClick={() => changeStatus(taskId, 'active')}
                        className='w-44 h-10 bg-green-500 hover:bg-green-700 flex justify-center items-center'
                    >
                        {notReadyToCheckElement}
                    </Button>
                )}
                {task?.status === 'check' && user?.role === 'Master' && (
                    <>
                        <Button
                            onClick={() => changeStatus(taskId, 'active')}
                            className='bg-green-500 hover:bg-green-700 w-52 h-10 flex justify-center items-center'
                        >
                            {activeButtonElement}
                        </Button>
                        <Button
                            onClick={() => changeStatus(taskId, 'finished')}
                            className='bg-amber-500 hover:bg-amber-700  w-40 h-10 flex justify-center items-center'
                        >
                            {finishedButtonElement}
                        </Button>
                    </>
                )}
                {task?.status === 'finished' && user?.role === 'Master' && (
                    <Button
                        onClick={() => changeStatus(taskId, 'check')}
                        className='w-48 h-10 flex justify-center items-center'
                    >
                        {revertButtonElement}
                    </Button>
                )}
            </div>
        </Layout>
    )
}

export default privateRoute(MyEditor)
