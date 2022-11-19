import React from 'react'
import clsx from 'clsx'

interface PopupWrapperProps {
  children: React.ReactNode
  className?: string
}

const PopupWrapper = ({ children, className }: PopupWrapperProps) => {
  const classes = clsx([
    'fixed z-100 top-0 left-0 w-screen h-screen',
    className,
  ])

  return (
    <div className={classes}>
      <div className='fixed top-1/2 left-1/2 white translate-y-1/2 translate-x-1/2 animate-spin'>
        {children}
      </div>
    </div>
  )
}

export default PopupWrapper
