import {useEffect, useState} from "react";
import styled from "styled-components";
import BlockCreator from "../molecules/BlockCreator";
import CustomBlock from "../molecules/CustomBlock";
import {doc, getDoc, updateDoc} from "@firebase/firestore";
import {db} from "../../firebase/firebase";
import CustomButton from "../atoms/CustomButton";

export default function TaskEditor({taskId}:any) {



    const [structure,setStructure] = useState<Array<object>>([])

    const updateTask = async (task_id: string) => {
        const taskDoc = doc(db, 'task', task_id)
        await updateDoc(taskDoc, {
            html: structure
        })

        console.log(structure)
        console.log('update')
    }
    useEffect(() => {
        console.log('Fetch task id: ', taskId)

        const fetchTask = async (task_id: string) => {
            const taskDoc = doc(db, 'task', task_id)
            const data: any = await getDoc(taskDoc)
            const task = data.data()



            if (task.html) {
                setStructure(task.html)
            } else {
                console.log('empty content')
            }
        }

        fetchTask(taskId.toString())
    }, [])


    return <>
        <StructureContainer>
            {
                structure.map((element:any,index) => {
                    return <CustomBlock key={index} {...element} taskId={taskId} structure={structure} setStructure={setStructure} currentStructure={index}/>
                })
            }
            <BlockCreator setStructure={setStructure}/>
            <button onClick={()=>{console.log(structure)}}>Show</button>
        </StructureContainer>
        <CustomButton customFunction={() => updateTask(taskId)}>
            Save
        </CustomButton>
    </>
}

const StructureContainer = styled.div`
  border: 2px solid yellow;
  padding: 2em;
`;
