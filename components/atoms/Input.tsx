import React from 'react'
import clsx from 'clsx'

interface InputProps {
    type: string
    innerRef?: React.MutableRefObject<any>
    required?: boolean
    className?: string
    placeholder?: string
    defaultValue?: string
}

const Input = ({
    className,
    type,
    required,
    placeholder,
    defaultValue,
    innerRef,
}: InputProps) => {
    const classes = clsx(['rounded block w-4/5 mx-auto'], className)

    return (
        <input
            className={classes}
            type={type}
            required={required}
            placeholder={placeholder}
            defaultValue={defaultValue}
            ref={innerRef}
        />
    )
}

export default Input
