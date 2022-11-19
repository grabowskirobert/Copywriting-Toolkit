import React from 'react'
import clsx from 'clsx'

interface FormContainerProps { 
  children: React.ReactNode
  className?: string
}

const FormContainer = ({ children, className }: FormContainerProps) => {
  const classes = clsx(
    ['max-w-[375px] min-w-[375px] text-center mx-auto'],
    className
  )

  return <div className={classes}>{children}</div>
}

export default FormContainer
