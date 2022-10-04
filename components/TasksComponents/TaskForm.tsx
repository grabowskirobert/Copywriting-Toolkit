import { useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import {  addDoc, doc, updateDoc } from "@firebase/firestore";
import { useRouter } from "next/router";
import CustomButton from "../atoms/CustomButton";
import CustomCard from "../atoms/CustomCard";



const TaskForm = ({taskForm,update = false,reload,setReload,closeWindow,taskCollection,taskId}:any) => {

    const router = useRouter();

    const [form,setForm] = useState({
        userUID: taskForm.userUID,
        task_title: taskForm.task_title,
        date_start: taskForm.date_start,
        date_end: taskForm.date_end,
        keywords: taskForm.keywords,
        content: taskForm.content
    });

    function handleChange(e:any) {
        const { value, name } = e.target;
            setForm((prevState:any) => ({
                ...prevState,
                [name]: value
            }));
    }

    const createTask = async (body:any) => {
        await addDoc(taskCollection, body);
        closeWindow();
        setReload();
    }

    const updateTask = async (task_id:any,body:any) => {
        const taskDoc = doc(db, "task", task_id);
        await updateDoc(taskDoc,body);
        router.back();
    }
    async function handleSubmit(e:any) {
        e.preventDefault();
        if(update) {
            console.log('update');
            updateTask(taskId,form);
        }
        else if (!update) {
            console.log('create');
            createTask(form);
        }
        else {
            console.error("Submit error");
        }
    }

    return (
      <>  
      {update && <CustomButton customFunction={()=>router.back()}>Return</CustomButton>}
        <Container>
            <CustomCard>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task_title">Task title</label>
                <input type="text" value={form.task_title} onChange={handleChange} name="task_title"/>
                <label htmlFor="date_start">Date start</label>
                <input type="date" value={form.date_start} onChange={handleChange} name="date_start"/>
                <label htmlFor="date_end">Date end</label>
                <input type="date" value={form.date_end} onChange={handleChange} name="date_end"/>
                <label htmlFor="keywords">Keywords</label>
                <input type="text" value={form.keywords} onChange={handleChange} name="keywords"/>

                <input type="submit" value={update ? "Update" : "Create"} />
                {!update && <CustomButton customFunction={()=>closeWindow()}>Close</CustomButton>}
            </form>
            </CustomCard>
        </Container>
      </>
    )
}
const Container = styled.div`

position: absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
padding: 2em;
width: min(calc(100%),600px);
    form {
        display:flex;
        flex-direction:column;
        gap:1em;
    }
`;

export default TaskForm;