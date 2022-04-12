import styled from "styled-components";
import { RiArrowDownSLine } from 'react-icons/ri'
import { useState } from "react";
import CustomButton from "../CustomButton";
import Link from "next/link";
const Task = ({ id, task_title, date_start, date_end,deleteTask,editTask }:any) => {
    const [showMore, setShowMore] = useState<boolean>(false);

    function More() {
        return (
            <>
                <div className="my-5">
                    <p>Data rozpoczęcia: {date_start}</p>
                    <p>Data zakończenia: {date_end}</p>
                </div>
                <div className="flex justify-end gap-3">
                    <CustomButton secondColor customFunction={()=>deleteTask()}>Usuń zadanie i przenieś do archiwum</CustomButton>
                    <CustomButton>
                        <Link href={`/tasks/${id}/edit`}>Edytuj szczegóły zadania</Link>
                    </CustomButton>
                    <CustomButton>
                        <Link href={`/tasks/${id}`} >Przejdź do zadania</Link>
                    </CustomButton>
                </div>
            </>
        )
    }

    return (
        <div className="py-2 px-3.5 border-b-2">
            <div className="relative cursor-pointer" onClick={() => setShowMore(!showMore)}>
                <p><b>{task_title}</b></p>
                <RiArrowDownSLine className="absolute top-2 right-1" onClick={() => setShowMore(!showMore)} />
            </div>
            {
                showMore && <More />
            }
        </div >
    )
}

export default Task;