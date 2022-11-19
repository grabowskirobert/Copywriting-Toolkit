import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

interface CustomLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

const CustomLink = ({ href, children, className }: CustomLinkProps) => {
  const classes = clsx(['text-indigo-600 underline cursor-pointer'], className)

  return (
    <Link href={href} passHref>
      <span className={classes}>{children}</span>
    </Link>
  )
}

export default CustomLink
