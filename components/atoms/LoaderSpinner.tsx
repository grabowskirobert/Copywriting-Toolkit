import React from 'react'
import clsx from 'clsx'
import { Oval } from 'react-loader-spinner'

interface LoaderSpinner {
  visible: boolean
  color?: 'white'
  secondaryColor?: 'grey'
  wrapperClasses?: string
}

const STROKE_SIZE = 3
const SVG_SIZE = 34

const LoaderSpinner = ({
  visible = true,
  color = 'white',
  secondaryColor = 'grey',
  wrapperClasses = '',
}: LoaderSpinner) => {
  const classes = clsx([
    !!wrapperClasses && wrapperClasses,
    visible ? 'block' : 'hidden',
  ])

  return (
    <div className={classes}>
      <Oval
        height={SVG_SIZE}
        width={SVG_SIZE}
        color={color}
        secondaryColor={secondaryColor}
        ariaLabel="oval-loading"
        strokeWidth={STROKE_SIZE}
        strokeWidthSecondary={STROKE_SIZE}
      />
    </div>
  )
}

export default LoaderSpinner
