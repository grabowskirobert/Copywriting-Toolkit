interface Btn {
  children?: any
  secondColor?: boolean
  customFunction?: (p: any) => void
}

const CustomButton = ({ children, secondColor, customFunction }: Btn) => {
  return (
    <button
      onClick={customFunction}
      className={`text-center bg-trasnparent text-white py-2 px-4 rounded ${
        secondColor
          ? 'bg-red-500 hover:bg-red-700'
          : 'bg-indigo-500 hover:bg-indigo-600'
      }`}
    >
      {children}
    </button>
  )
}

export default CustomButton
