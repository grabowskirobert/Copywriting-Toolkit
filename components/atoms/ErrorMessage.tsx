import React from 'react'
import clsx from 'clsx'

interface ErrorMessageProps {
    children: React.ReactNode
    className?: string
}

const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
    const classes = clsx(['text-error font-bold'], className)

    return <p className={classes}>{children}</p>
}

export default ErrorMessage
