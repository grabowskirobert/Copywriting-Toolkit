import React from 'react'
import clsx from 'clsx'

interface InputProps {
  type: string
  ref: React.MutableRefObject<any>
  required?: boolean
  className?: string
  placeholder?: string
  defaultValue?: string
}

const Input = ({
  className,
  type,
  required,
  ref,
  placeholder,
  defaultValue,
}: InputProps) => {
  const classes = clsx(['rounded block w-4/5 mx-auto'], className)

  return (
    <input
      className={classes}
      type={type}
      required={required}
      ref={ref}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  )
}

export default Input
