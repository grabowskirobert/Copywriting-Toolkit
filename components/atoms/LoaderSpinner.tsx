import React from 'react'
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
  return (
    <div className={`${wrapperClasses} ${visible ? ' block' : ' hidden'}`}>
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
