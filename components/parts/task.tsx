import styled from "styled-components";
import { RiArrowDownSLine } from 'react-icons/ri'
import { useState } from "react";
import CustomButton from "./button";
import Link from "next/link";
const Task = ({ _id, title, date_start, date_end }) => {
    const [showMore, setShowMore] = useState<boolean>(false);


    function More() {
        return (
            <>
                <div className="my-5">
                    <p>Data rozpoczęcia: {date_start}</p>
                    <p>Data zakończenia: {date_end}</p>
                </div>
                <div className="flex justify-end gap-3">
                    <CustomButton secondColor={true}>Usuń zadanie i przenieś do archiwum</CustomButton>
                    <CustomButton>Edytuj szczegóły zadania</CustomButton>
                    <CustomButton>
                        <Link href={`/tasks/${_id}`} >Przejdź do zadania</Link>
                    </CustomButton>
                </div>
            </>
        )
    }

    return (
        <div className="py-2 px-3.5 border-b-2">
            <div className="relative cursor-pointer" onClick={() => setShowMore(!showMore)}>
                <p><b>{title}</b></p>
                <RiArrowDownSLine className="absolute top-2 right-1" onClick={() => setShowMore(!showMore)} />
            </div>
            {
                showMore && <More />
            }
        </div >
    )
}

const Container = styled.div`
    padding: .5em 1em;
    border-bottom: 1px solid grey;
`;

export default Task;