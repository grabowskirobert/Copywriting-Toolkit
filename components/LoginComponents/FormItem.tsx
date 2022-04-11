import classNames from 'classnames'
import React from 'react'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import { PopUpMessage } from '../../styles/Shared'

const StyledFormItem = styled.div`
  position: relative;
`
const StyledInput = styled.input`
  border: 1px solid black; //TODO COLOR
  padding: 0.7rem;
  width: 100%;
  border-radius: 0.4rem;
`

interface InputProps {
  placeholder: string
  name: string
  type: 'email' | 'password'
  rows?: number
  register: UseFormRegister<FieldValues>
  options?: RegisterOptions
  error: { [x: string]: any }
  errorMessage?: string
  className?: string
  disabled?: boolean
}

const FormItem = ({
  placeholder,
  name,
  type,
  register,
  options,
  error,
  errorMessage,
  className,
  disabled,
}: InputProps) => {
  return (
    <StyledFormItem className={className}>
      <label htmlFor={name} />
     
        <StyledInput
          {...register(name, options)}
          type={type}
          placeholder={placeholder}
          disabled={!!disabled}
          className={classNames('outline-none', {
            ['ring-red-500 ring-1']: error,
          })}
        />
      
      {!!error && <PopUpMessage>{errorMessage}</PopUpMessage>}
    </StyledFormItem>
  )
}

export default FormItem
