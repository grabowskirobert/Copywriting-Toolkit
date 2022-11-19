const Card = ({ children }: any) => {
  return (
    <div className='p-5 flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200'>
      {children}
    </div>
  )
}

export default Card
