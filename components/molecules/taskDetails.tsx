import CustomButton from "../atoms/CustomButton";
import Link from "next/link";

interface Props {
    id: string;
    deleteTask: () => {}
    date_start: string,
    date_end: string

}

export default function TaskDetails(props:Props) {

    const {id, deleteTask, date_start, date_end} = props;

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