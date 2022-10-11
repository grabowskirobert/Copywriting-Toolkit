import TaskEditor from "../../../components/organisms/TaskEditor";
import CustomButton from "../../../components/atoms/CustomButton";
import {useRouter} from "next/router";
import Head from "next/head";
import {useState} from "react";
import styled from "styled-components";

export default function Creator() {
    const router = useRouter()
    const taskId: any = router.query.id


    const [test,setTest] = useState('')

    function generateLink() {
        setTest(taskId)
    }

    function copy(e:any) {
        console.log('copied...')
        navigator.clipboard.writeText(e.currentTarget.textContent)
    }

    return <>
        <Head>
            <link
                rel='stylesheet'
                href='https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css'
            />
        </Head>
        <CustomButton customFunction={() => router.back()}>Return</CustomButton>
        <br/>
        <br/>
      <div>
          <TaskEditor taskId={taskId} />

          <br/>

          <CustomButton customFunction={generateLink}>Generate link</CustomButton>

          {
              test && <Code onClick={copy} id="copy">
                  http://localhost:3000/api/task/{test}
              </Code>
          }
      </div>
    </>
}

const Code = styled.code`
  background-color: #c4c4c4;
  padding: .4em;
  border: 2px solid black;
  margin-left: 1em;
`;