import TextEditor from "./TextEditor";
import styled from "styled-components";
import CustomButton from "../atoms/CustomButton";


export default function CustomBlock(element:any) {

    const removeSelected = () => {
        element.setStructure(element.structure.filter((item:any,index:number)=> index !== element.currentStructure))

    }


    const blockType = Object.keys(element)[0];

    switch (blockType) {
        case 'container': {
            return <div>
                <TextEditor type={blockType}  text={element.container.text} structure={element.structure} setStructure={element.setStructure} currentStructure={element.currentStructure}/>
                <button onClick={removeSelected}>Remove2</button>
            </div>
        }
        case 'column2X': {
            return <>
                <Column2X>
                    {
                        (element[blockType].map((el:any,index:any)=>{
                            return <TextEditor key={index} type={blockType} structure={element.structure} setStructure={element.setStructure} columnIndex={index} currentStructure={element.currentStructure}/>
                        }))
                    }
                </Column2X>
                <CustomButton customFunction={removeSelected}>Remove2</CustomButton></>

        }
        default: {
            return null;
        }
    }

}

const Column2X = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr .5fr;
`;
