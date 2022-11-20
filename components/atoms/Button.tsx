import clsx from 'clsx'

interface ButtonProps {
  children?: any
  red?: boolean
  onClick?: (p: any) => void
  disabled?: boolean
  type?: string
  hidden?: boolean
  className?: string
}

const Button = ({
  children,
  red,
  onClick,
  disabled,
  hidden,
  className,
}: ButtonProps) => {
  const classes = clsx([
    'text-center bg-trasnparent text-white py-2 px-4 mt-4 rounded',
    red
      ? 'bg-red-500 hover:bg-red-700'
      : 'bg-indigo-500 hover:bg-indigo-600',
    disabled && 'opacity-70 cursor-not-allowed',
    hidden && 'hidden',
    className,
  ])

  return (
    <button
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  )
}

export default Button
