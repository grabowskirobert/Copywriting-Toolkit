import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'

// import SidebarLinkGroup from './SidebarLinkGroup'

function Sidebar({ sidebarOpen, setSidebarOpen }: any) {
  const router = useRouter()
  const { pathname } = router
  const trigger: any = useRef(null)
  const sidebar: any = useRef(null)
  const storedSidebarExpanded = null

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden='true'
      ></div>

      {/* Sidebar */}
      <div
        id='sidebar'
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen  w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className='flex justify-between mb-10 pr-3 sm:px-2'>
          {/* Close button */}
          <button
            ref={trigger}
            className='lg:hidden text-slate-500 hover:text-slate-400'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
          >
            <span className='sr-only'>Close sidebar</span>
            <svg
              className='w-6 h-6 fill-current'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z' />
            </svg>
          </button>
          {/* Logo */}
          <Link href='/' passHref>
            <a className='block'>
              <svg width='32' height='32' viewBox='0 0 32 32'>
                <defs>
                  <linearGradient
                    x1='28.538%'
                    y1='20.229%'
                    x2='100%'
                    y2='108.156%'
                    id='logo-a'
                  >
                    <stop stopColor='#A5B4FC' stopOpacity='0' offset='0%' />
                    <stop stopColor='#A5B4FC' offset='100%' />
                  </linearGradient>
                  <linearGradient
                    x1='88.638%'
                    y1='29.267%'
                    x2='22.42%'
                    y2='100%'
                    id='logo-b'
                  >
                    <stop stopColor='#38BDF8' stopOpacity='0' offset='0%' />
                    <stop stopColor='#38BDF8' offset='100%' />
                  </linearGradient>
                </defs>
                <rect fill='#6366F1' width='32' height='32' rx='16' />
                <path
                  d='M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z'
                  fill='#4F46E5'
                />
                <path
                  d='M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z'
                  fill='url(#logo-a)'
                />
                <path
                  d='M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z'
                  fill='url(#logo-b)'
                />
              </svg>
            </a>
          </Link>
        </div>

        {/* Links */}
        <div className='space-y-8'>
          {/* Pages group */}
          <div>
            <h3 className='text-xs uppercase text-slate-500 font-semibold pl-3'>
              <span
                className='hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6'
                aria-hidden='true'
              >
                •••
              </span>
              <span className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                Pages
              </span>
            </h3>
            <ul className='mt-3' style={{ color: '#fff' }}>
              {/* Dashboard */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0  ${
                  pathname === '/' && 'bg-slate-900'
                }`}
              >
                <Link href='/' passHref>
                  <a
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname === '/' && 'hover:text-slate-200'
                    }`}
                  >
                    <div className='flex items-center'>
                      <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                        <path
                          className={`fill-current text-slate-400 ${
                            pathname === '/' && '!text-indigo-500'
                          }`}
                          d='M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z'
                        />
                        <path
                          className={`fill-current text-slate-600 ${
                            pathname === '/' && 'text-indigo-600'
                          }`}
                          d='M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z'
                        />
                        <path
                          className={`fill-current text-slate-400 ${
                            pathname === '/' && 'text-indigo-200'
                          }`}
                          d='M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z'
                        />
                      </svg>
                      <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                        Dashboard
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
              {/* Analytics */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0  ${
                  pathname.includes('analytics') && 'bg-slate-900'
                }`}
              >
                <Link href='/analytics' passHref>
                  <a
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes('analytics') && 'hover:text-slate-200'
                    }`}
                  >
                    <div className='flex items-center'>
                      <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                        <path
                          className={`fill-current text-slate-600 ${
                            pathname.includes('analytics') && 'text-indigo-500'
                          }`}
                          d='M0 20h24v2H0z'
                        />
                        <path
                          className={`fill-current text-slate-400 ${
                            pathname.includes('analytics') && 'text-indigo-300'
                          }`}
                          d='M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z'
                        />
                      </svg>
                      <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                        Analytics
                      </span>
                    </div>
                  </a>
                </Link>
              </li> */}
              {/* Tasks */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0  ${
                  pathname.includes('tasks') && 'bg-slate-900'
                }`}
              >
                <Link href='/tasks' passHref>
                  <a
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes('tasks') && 'hover:text-slate-200'
                    }`}
                  >
                    <div className='flex items-center'>
                      <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                        <path
                          className={`fill-current text-slate-600 ${
                            pathname.includes('tasks') && 'text-indigo-500'
                          }`}
                          d='M8 1v2H3v19h18V3h-5V1h7v23H1V1z'
                        />
                        <path
                          className={`fill-current text-slate-600 ${
                            pathname.includes('tasks') && 'text-indigo-500'
                          }`}
                          d='M1 1h22v23H1z'
                        />
                        <path
                          className={`fill-current text-slate-400 ${
                            pathname.includes('tasks') && 'text-indigo-300'
                          }`}
                          d='M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z'
                        />
                      </svg>
                      <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                        Tasks
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
              {/* Team */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0  ${
                  pathname.includes('team') && 'bg-slate-900'
                }`}
              >
                <Link href='/team' passHref>
                  <a
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes('team') && 'hover:text-slate-200'
                    }`}
                  >
                    <div className='flex items-center'>
                      <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                        <path
                          className={`fill-current text-slate-600 ${
                            pathname.includes('community') && 'text-indigo-500'
                          }`}
                          d='M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z'
                        />
                        <path
                          className={`fill-current text-slate-400 ${
                            pathname.includes('community') && 'text-indigo-300'
                          }`}
                          d='M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z'
                        />
                      </svg>
                      <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                        Team
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
              {/* Calendar */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0  ${
                  pathname.includes('calendar') && 'bg-slate-900'
                }`}
              >
                <Link href='/calendar' passHref>
                  <a
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes('calendar') && 'hover:text-slate-200'
                    }`}
                  >
                    <div className='flex items-center'>
                      <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                        <path
                          className={`fill-current text-slate-600 ${
                            pathname.includes('calendar') && 'text-indigo-500'
                          }`}
                          d='M1 3h22v20H1z'
                        />
                        <path
                          className={`fill-current text-slate-400 ${
                            pathname.includes('calendar') && 'text-indigo-300'
                          }`}
                          d='M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z'
                        />
                      </svg>
                      <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                        Calendar
                      </span>
                    </div>
                  </a>
                </Link>
              </li> */}
              {/* archive*/}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0  ${
                  pathname.includes('archive') && 'bg-slate-900'
                }`}
              >
                <Link href='/archive' passHref>
                  <a
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes('archive') && 'hover:text-slate-200'
                    }`}
                  >
                    <div className='flex items-center'>
                      <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
                        <g>
                          <path
                            className={`fill-current text-slate-400 ${
                              pathname.includes('archive') && 'text-indigo-300'
                            }`}
                            d='m24 5.793h-24v-4.3828c0-0.32031 0.26172-0.58203 0.58594-0.58203h22.828c0.32422 0 0.58594 0.26172 0.58594 0.58203z'
                          />
                          <path
                            className={`fill-current text-slate-600 ${
                              pathname.includes('archive') && 'text-indigo-500'
                            }`}
                            d='m1.2422 5.793v15.969c0 0.77734 0.63281 1.4102 1.4102 1.4102h18.695c0.77734 0 1.4102-0.63281 1.4102-1.4102v-15.969z'
                          />
                          <path
                            className={`fill-current text-slate-400 ${
                              pathname.includes('archive') && 'text-indigo-300'
                            }`}
                            d='m14.273 12.414h-4.5469c-0.80078 0-1.4492-0.65234-1.4492-1.4492v-0.62109c0-0.22656 0.18359-0.41406 0.41406-0.41406 0.22656 0 0.41016 0.1875 0.41016 0.41406v0.62109c0 0.34375 0.28125 0.62109 0.625 0.62109h4.5469c0.34375 0 0.625-0.27734 0.625-0.62109v-0.62109c0-0.22656 0.18359-0.41406 0.41016-0.41406 0.23047 0 0.41406 0.1875 0.41406 0.41406v0.62109c0 0.79688-0.64844 1.4492-1.4492 1.4492z'
                          />
                        </g>
                      </svg>
                      <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                        Archive
                      </span>
                    </div>
                  </a>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className='pt-3 hidden lg:inline-flex 2xl:hidden justify- mt-auto'>
          <div className='px-3 py-2'>
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className='sr-only'>Expand / collapse sidebar</span>
              <svg
                className='w-6 h-6 fill-current sidebar-expanded:rotate-180'
                viewBox='0 0 24 24'
              >
                <path
                  className='text-slate-400'
                  d='M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z'
                />
                <path className='text-slate-600' d='M3 23H1V1h2z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
