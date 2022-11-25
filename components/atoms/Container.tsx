import React from 'react'
import clsx from 'clsx'

interface ContainerProps {
    children: React.ReactNode
    className?: string
}

const Container = ({ children, className }: ContainerProps) => {
    const classes = clsx([
        'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-8 w-full max-w-[600px]',
        className,
    ])

    return <div className={classes}>{children}</div>
}

export default Container
