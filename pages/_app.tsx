import '../styles/globals.css'
import { useState } from 'react';
import type { AppProps } from 'next/app'

import Header from '../components/template/partials/Header';
import Sidebar from '../components/template/partials/Sidebar';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const { pathname } = router;
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <>
      <Head>
        <title>{pathname === "/" ? "Dashboard" : pathname[1]?.toUpperCase() + pathname?.substring(2)}</title>
      </Head>
      <div className="flex h-screen overflow-hidden">

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <Component {...pageProps} />

            </div>
          </main>

        </div>
      </div>
    </>
  )
}

export default MyApp
