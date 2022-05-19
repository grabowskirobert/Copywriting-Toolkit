import styled from 'styled-components'
interface PopUpProps {
  status200?: boolean
}

export const PopUpMessage = styled.div<PopUpProps>`
  /* position: absolute; */
  white-space: nowrap;
  font-size: 0.7rem;
  top: ${({ status200 }) => (status200 ? '-5.5rem' : '-2rem')};
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background-color: ${({ status200, theme }) =>
    status200 ? theme.colors.green : theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.4rem;
  padding: ${({ status200 }) => (status200 ? '1.2rem' : '0.6rem')};

  transition: all 0.2s ease;
  &::after {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    transform: translateX(-50%) rotate(45deg);
    left: 50%;
    top: ${({ status200 }) => (status200 ? '3.6rem' : '1.5rem')};
    border-width: 0.5rem;
    border-radius: 0.1rem;
    border-style: solid;
    border-color: ${({ status200, theme }) =>
      status200 ? theme.colors.green : theme.colors.error};
  }
`
export const ErrorMessage = styled.div`
  color: ${({theme})=> theme.colors.error};
  font-weight: bold;
`

export const FormContainer = styled.div`
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
`

export const FormCell = styled.div`
  display: block;
  width: 100%;
  padding: 0.5rem;
`

export const StyledInput = styled.input`
  border-radius: 0.25rem;
  display: block;
  width: 80%;
  margin: 0 auto;
`


