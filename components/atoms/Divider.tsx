import React from 'react'
import clsx from 'clsx'

interface DividerProps {
    className?: string
}

const Divider = ({ className }: DividerProps) => {
    const classes = clsx(['border-b border-gray-300', className])
    return <div className={classes} />
}

export default Divider
