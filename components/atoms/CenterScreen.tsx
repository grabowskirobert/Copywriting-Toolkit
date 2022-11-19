import React from 'react'
import clsx from 'clsx'

interface CenterScreenProps {
  children: React.ReactNode
  className?: string
}

const CenterScreen = ({ children, className }: CenterScreenProps) => {
  const classes = clsx(
    ['flex justify-center items-center text-center min-h-screen'],
    className
  )

  return <div className={classes}>{children}</div>
}

export default CenterScreen
