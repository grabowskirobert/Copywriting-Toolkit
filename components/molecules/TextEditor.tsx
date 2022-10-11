import dynamic from "next/dynamic";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import {EditorProps} from "react-draft-wysiwyg";
import {useEffect, useState} from "react";
import draftToHtml from "draftjs-to-html";
const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

export default function TextEditor({columnIndex,type,structure,setStructure,currentStructure}:any) {

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

    const updateField = (index:number) => () => {
        console.log(index, ' - ', columnIndex)
        const rawContent = convertToRaw(editorState.getCurrentContent())

        const markup = draftToHtml(
            rawContent,
        );

        let newArr = [...structure];

        if(type === "container") {
            newArr[index][type].editor = rawContent
            newArr[index][type].production = markup
        }else if (type === "column2X") {
            newArr[index][type][columnIndex].editor = rawContent
            newArr[index][type][columnIndex].production = markup
        }

        setStructure(newArr)
    }
    const removeSelected = () => {
        setStructure(structure.filter((item:any,index:number)=> index !== currentStructure))
    }

    useEffect(() => {
        if(type === "container") {
            if(structure[currentStructure][type].editor !== '') {
                setEditorState(() =>
                    EditorState.createWithContent(
                        convertFromRaw(structure[currentStructure][type].editor)
                    )
                )
            }
        } else if (type === "column2X") {
            if(structure[currentStructure][type][columnIndex].editor !== '') {
                setEditorState(() =>
                    EditorState.createWithContent(
                        convertFromRaw(structure[currentStructure][type][columnIndex].editor)
                    )
                )
            }
        }
    }, []);


    return <>
        <Editor
            editorState={editorState}
            onChange={updateField(currentStructure)}
            onEditorStateChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            placeholder="Dodaj tekst"
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
        {/*<button onClick={removeSelected}>Remove</button>*/}
    </>
}