import React from 'react'
import clsx from 'clsx'

interface StatusDiodeProps {
    status: 'active' | 'deadline' | 'check' | 'finished'
}

const StatusDiode = ({ status }: StatusDiodeProps) => {
    const diodeColor = () => {
        if (status === 'active') return 'bg-green-500 shadow-green-500'
        else if (status === 'finished') return 'bg-amber-500 shadow-amber-500'
        else if (status === 'deadline') return 'bg-indigo-600 shadow-indigo-600'
        else if (status === 'check') return 'bg-error shadow-error'
    }

    const classes = clsx(
        ['p-1 rounded-[50%] shadow-sm w-px h-px'],
        diodeColor()
    )

    return <div className={classes} />
}

export default StatusDiode
