import { useRouter } from 'next/router'
import CustomButton from '../../../components/atoms/CustomButton'
import privateRoute from '../../../layouts/PrivateRoute'
import { db } from '../../../firebase/firebase'
import { getDoc, doc, updateDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import { EditorProps } from 'react-draft-wysiwyg'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Layout from '../../../layouts/Layout'

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
  const handleKeyCommand = (command: string, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      setEditorState(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  const [html,setHtml] = useState<string>();

  const updateTask = async (task_id: string) => {
    const taskDoc = doc(db, 'tasks', task_id)
    await updateDoc(taskDoc, {
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    })
    console.log('update')
  }

  useEffect(() => {
    console.log('Fetch task id: ', taskId)

    const fetchTask = async (task_id: string) => {
      const taskDoc = doc(db, 'tasks', task_id)
      const data: any = await getDoc(taskDoc)
      const task = data.data()
      if (task.content) {
        setEditorState(() =>
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(task.content))
          )
        )
      } else {
        console.log('empty content')
      }
    }

    fetchTask(taskId.toString())
  }, [])

  // const _onBoldClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  // }
  // const _onItalicClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  // }
  // const _onUnderlineClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  // }
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
      <div>
        <Head>
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css'
          />
        </Head>
        <CustomButton customFunction={() => router.back()}>Return</CustomButton>
        <br />
        {/* <CustomButton customFunction={_onBoldClick}>BOLD</CustomButton>
    <CustomButton customFunction={_onItalicClick}>ITALIC</CustomButton>
    <CustomButton customFunction={_onUnderlineClick}>UNDERLINE</CustomButton> */}
        <br />
        <br />
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
        <br />
        <CustomButton customFunction={() => updateTask(taskId)}>
          Save
        </CustomButton>
      </div>
    </Layout>
  )
}

export default privateRoute(MyEditor)
