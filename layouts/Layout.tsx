import React, { useState } from 'react'
import Header from '../components/organisms/Header'
import Sidebar from '../components/molecules/Sidebar'

export default function Layout({ children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="w-11/12 mx-auto mt-10">{children}</div>
      </div>
    </div>
  )
}
