import React from 'react'
import clsx from 'clsx'

interface FormCellProps {
  children: React.ReactNode
  id: string
  className?: string
}

const FormCell = ({ children, className, id }: FormCellProps) => {
  const classes = clsx(['block w-full p-2'], className)

  return (
    <div className={classes} id={id}>
      {children}
    </div>
  )
}

export default FormCell
