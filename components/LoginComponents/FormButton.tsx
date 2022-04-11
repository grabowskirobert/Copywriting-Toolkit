import React from 'react'
import { PopUpMessage } from '../../styles/Shared'
import CustomButton from '../CustomButton'

interface FormButtonProps {
  status200?: boolean
  error?: boolean
//   onClick: () => Promise<void>
  disabled?: boolean
}

const FormButton = ({ status200, error, disabled }: FormButtonProps) => {
  return (
    <button type='submit' className='mt-10 relative' disabled={!!disabled}>
      <CustomButton disabled={!!disabled}>Submit</CustomButton>
      {!!status200 && (
        <PopUpMessage status200>
         Login successful 👌
        </PopUpMessage>
      )}
      {!!error && <PopUpMessage>Something went wrong.</PopUpMessage>}
    </button>
  )
}

export default FormButton
