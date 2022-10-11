import { RiArrowDownSLine } from 'react-icons/ri'
import { useState } from "react";
import TaskDetails from "../molecules/taskDetails";


const Task = ({ id, task_title, date_start, date_end,deleteTask }:any) => {
    const [showMore, setShowMore] = useState<boolean>(false);

    return (
        <div className="py-2 px-3.5 border-b-2">
            <div className="relative cursor-pointer" onClick={() => setShowMore(!showMore)}>
                <p><b>{task_title}</b></p>
                <RiArrowDownSLine className="absolute top-2 right-1" onClick={() => setShowMore(!showMore)} />
            </div>
            {
                showMore && <TaskDetails id={id} deleteTask={deleteTask} date_end={date_end}  date_start={date_start}/>
            }
        </div >
    )
}

export default Task;