import styled from "styled-components";
import {useState} from "react";

interface Props {
    status: string;
}

export default function StatusDiode({status}:Props) {

    const [diodeColor,setDiodeColor] = useState(() => {
        if(status === 'active') return 'green'
        else if(status === 'inactive') return 'orange'
        else return 'red'
    })

    return <Diode color={diodeColor} title={status}></Diode>
}

const Diode = styled.p`
    background-color: ${props => props.color};
    padding: .3em;
  border-radius: 50%;
  box-shadow: 0 0 3px ${props => props.color};
  width: 1px;
  height: 1px;

`;