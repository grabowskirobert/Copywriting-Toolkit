import {GoDiffAdded} from "react-icons/go";
import {useState} from "react";
import styled from "styled-components";

export default function BlockCreator({setStructure}:any) {

    const container = {
        production: '',
        editor: '',
    }

    const column2X = [
        {
            production: '',
            editor: '',
        },
        {
            production: '',
            editor: '',
        },
    ]

    const column3X = [
        {
            production: '',
            editor: '',
        },{
            production: '',
            editor: '',
        },
        {
            production: '',
            editor: '',
        },
    ]


    const [showModal,setShowModal] = useState<boolean>(false)


    function createContainer() {
        setShowModal(!showModal)
        setStructure((oldArray:any) => ([...oldArray, {container}]))
    }

    function createColumn2X() {
        setShowModal(!showModal)
        setStructure((oldArray:any) => ([...oldArray, {column2X}]))
    }
    function createColumn3X() {
        setShowModal(!showModal)
        setStructure((oldArray:any) => ([...oldArray, {column3X}]))
    }

    return (
        <Wrapper>
            <CreateBtn onClick={()=>setShowModal(!showModal)}>
                <GoDiffAdded />
            </CreateBtn>
            {
                showModal && <CreatorSimModal>
                    <button onClick={createContainer}>Container</button>
                    <button onClick={createColumn2X}>Column 2X</button>
                    <button onClick={createColumn3X}>Column 3X</button>
                    <button >Text</button>
                </CreatorSimModal>
            }
        </Wrapper>
    )


}

const Wrapper = styled.div`
          position: relative;
        
        `;
const CreatorSimModal = styled.div`
      padding: .5em;
      top: -100%;
      left: 5%;
      position: absolute;
      background-color: #c4c4c4;
      display: flex;
      flex-direction: column;

      button {
        :hover {
          background-color: #e3e3e3;
        }
      }
    `
const CreateBtn = styled.button`
          color: #000;
          :hover {
            color: #c4c4c4;
          }
        `