import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { pathname } = router

  return (
    <AuthProvider>
      <Head>
        <title>
          {pathname === '/'
            ? 'Copywriter Toolkit'
            : pathname[1]?.toUpperCase() +
              pathname?.substring(2) +
              ' | Copywriter Toolkit'}
        </title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
