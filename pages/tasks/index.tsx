import styled from "styled-components";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";
import { AiOutlineClose } from 'react-icons/ai'
import taskArray from "../../JSON/taskTemplate.json"
import Task from "../../components/TasksComponents/Task";
import { useState } from "react";

const Index = () => {

    const [query, setQuery] = useState<string>("")

    return (
        <div>
            <div>
                <div className="flex flex-col w-1/4">
                    <select>
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
                            className="w-1/2 focus:outline-none"
                            type="text"
                            placeholder="Wyszukaj poprzez wpisanie tematyki tekstu"
                            onChange={(e) => setQuery(e.currentTarget.value)}
                        />
                        <CustomButton>Dodaj zadanie</CustomButton>
                    </div>
                    {
                        taskArray.Task
                            .filter((el: any) => el.title.includes(query))
                            .map(el => <Task {...el} key={el._id} />)
                    }
                </div>
            </div>
        </div>
    )
}



export default Index;