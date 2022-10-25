import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface StyledLinkProps {
  href: string
  children: React.ReactNode
}

const StyledLinkText = styled.span`
  color: ${({ theme }) => theme.colors.purple};
  text-decoration: underline;
  cursor: pointer;
`

const StyledLink = ({ href, children }: StyledLinkProps) => {
  return (
    <Link href={href} passHref>
      <StyledLinkText>{children}</StyledLinkText>
    </Link>
  )
}

export default StyledLink
