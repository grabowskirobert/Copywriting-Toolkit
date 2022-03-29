import type { NextPage } from 'next'
import Head from 'next/head';
import { useState } from 'react';
// import { CgCoffee } from "react-icons/cg";
import Header from '../components/template/partials/Header';
import Sidebar from '../components/template/partials/Sidebar';

const Home: NextPage = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="flex h-screen overflow-hidden">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          </div>
        </main>

      </div>
    </div>
  )
}

export default Home
