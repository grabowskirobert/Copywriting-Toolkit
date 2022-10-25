interface Btn {
  children?: any
  secondColor?: boolean
  customFunction?: (p: any) => void
  disabled?: boolean
  type?: string
  hidden?: boolean
  className?: string
}

const CustomButton = ({
  children,
  secondColor,
  customFunction,
  disabled,
  hidden,
  className,
}: Btn) => {
  return (
    <button
      onClick={customFunction}
      className={`text-center bg-trasnparent text-white py-2 px-4 mt-4 rounded ${
        secondColor
          ? 'bg-red-500 hover:bg-red-700'
          : 'bg-indigo-500 hover:bg-indigo-600'
      }
      ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
      ${hidden ? 'hidden' : ''}
      ${className} 
      `}
    >
      {children}
    </button>
  )
}

export default CustomButton
