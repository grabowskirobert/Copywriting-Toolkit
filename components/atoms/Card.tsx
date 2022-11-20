import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  const classes = clsx([
    'p-5 flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200',
    className,
  ])

  return <div className={classes}>{children}</div>
}

export default Card
