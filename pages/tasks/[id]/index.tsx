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
    const [loadingElement, setLoadingElement] = useState<JSX.Element>(
        <span>Save</span>
    )

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

    const updateTask = async (task_id: string) => {
        const taskDoc = doc(db, 'tasks', task_id)
        setLoadingElement(
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
            setLoadingElement(<span>Try again</span>)
            console.log(err)
        }

        setLoadingElement(<MdDone className='w-7' />)
        setTimeout(() => {
            setLoadingElement(<span>Save</span>)
        }, 2000)
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
                    />
                </div>
            </div>
            <div className='border rounded mt-4 w-1/4 p-3'>
                <p>Characters with spaces: {currentCharacters()}</p>
                <ol>
                    <p>Keywords: </p>
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
                                        {index + 1}. {keyword}
                                    </li>
                                </p>
                            )
                        }
                    )}
                </ol>
            </div>
            <div className='flex gap-2'>
                <Button
                    onClick={() => updateTask(taskId)}
                    className='w-14 h-10 flex justify-center items-center'
                >
                    {loadingElement}
                </Button>
                <Button
                    onClick={() => {
                        console.log('Set task status to be checked')
                    }}
                >
                    Send to master
                </Button>
            </div>
        </Layout>
    )
}

export default privateRoute(MyEditor)
