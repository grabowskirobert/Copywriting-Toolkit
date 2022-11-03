import styled from "styled-components";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export default function SaveTaskAlert() {
    return <PopupWrapper>
        <AiOutlineLoading3Quarters size={60}/>
    </PopupWrapper>
}



const PopupWrapper = styled.div`

      background-color: rgba(0, 0, 0, 0.50);
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;

  svg {
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    color: #fff;
    animation: loader 3s linear;


  }
  
  
  
`
