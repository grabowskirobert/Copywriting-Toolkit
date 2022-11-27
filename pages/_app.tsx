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
                <link
                    rel='stylesheet'
                    href='https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css'
                />
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
