import CustomButton from "../../components/CustomButton";
import Task from "../../components/TasksComponents/Task";
import { useEffect, useState } from "react";
import {db} from '../../firebase/firebase'
import TaskForm from "../../components/TasksComponents/TaskForm";
import { collection, getDocs, addDoc, doc, deleteDoc } from "@firebase/firestore";
import privateRoute from '../../components/privateRoute';
import { useAuth } from '../../contexts/AuthContext'
import { StyledInput } from '../../styles/Shared';


const Index = () => {
    
    const [addTask, setAddTask] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [task,setTask] = useState<Array<any>>([]);
    const { currentUser } = useAuth()

    interface task {
        userUID: string;
        task_title: string;
        date_start: string;
        date_end: string;
        keywords: Array<string>;
        content: string;
        
    }
    
    const [taskForm,setTaskForm] = useState({
        userUID: currentUser?.uid,
        task_title: "",
        date_start: "",
        date_end: "",
        keywords: [],
        content: ''
    })

    const taskCollection = collection(db, "task");

    const deleteTask = async (id:any) => {
        const taskDoc = doc(db,"task", id);
        await deleteDoc(taskDoc);
        setReload(!reload);
        console.log('deleted')
    }

    useEffect(()=>{
        const getTask = async () => {
            const data = await getDocs(taskCollection);
            setTask(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        }
        getTask();

        return () => {
            setTask([])
        }
    },[reload])
    
    


    return (
        <div>
            <div>
                <div className="flex flex-col w-1/4">
                    <select className='rounded'>
                        <option value="">Pokaż wszystkie</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <p>Filtr zadań</p>
                    <CustomButton>Resetuj wybór filtru</CustomButton>
                </div>
            </div>
            <div className="flex justify-center ">
                <div className="w-4/5 mt-8 shadow-lg rounded" >
                    <div className="flex justify-between py-1 border-b-2">
                        <input
                            className='w-3/5 mr-auto rounded'
                            type="text"
                            placeholder="Wyszukaj poprzez wpisanie tematyki tekstu"
                            onChange={(e) => setQuery(e.currentTarget.value)}
                        />
                        <CustomButton customFunction={()=>{setAddTask(!addTask)}}>Dodaj zadanie</CustomButton>
                    </div>
                    {
                        task
                        .filter((taskUser:any) => taskUser.userUID?.includes(currentUser?.uid))
                        .filter((el: any) => el.task_title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
                        .map(el => <Task {...el} key={el.id} deleteTask={()=>deleteTask(el.id)}/>)
                    }
                </div>
            </div>
            {addTask && <TaskForm taskCollection={taskCollection} setReload={()=>setReload(!reload)}  taskForm={taskForm} closeWindow={()=>{setAddTask(!addTask)}} />}
        </div>
    )
}



export default privateRoute(Index);