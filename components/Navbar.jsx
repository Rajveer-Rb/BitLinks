"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import logo from '../public/logo.gif'

const Navbar = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const [showDropDown, setshowDropDown] = useState(false)

    return (
        <nav className='h-16 bg-purple-700 flex justify-between px-3 items-center text-white'>

            <div className="logo font-bold text-2xl flex gap-1 content-center items-center">
                <span><img src='/logo.gif' className='h-10' alt="logo" /></span>
                <Link href="/">BitLinks</Link>
            </div>

            <ul className='flex justify-center gap-4 items-center'>
                <Link href='/'><li>Home</li></Link>
                <Link href='/about'><li>About</li></Link>
                <Link href='/shorten'><li>Shorten</li></Link>
                <Link href='/contact'><li>Contact Us</li></Link>

                <li className='relative'>
                    {session && <> <button id="dropdownDefaultButton" onClick={() => setshowDropDown(!showDropDown)} onBlur={() => { setTimeout(() => { setshowDropDown(false) }, 300); }} data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>
                        {/* <!-- Dropdown menu --> */}
                        <div id="dropdown" className={`z-10 ${showDropDown ? "" : "hidden"} absolute left-[105px] top-[50px] bg-gray-600 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                            <ul className="py-2 text-sm text-gray-200 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                                </li>

                                <li>
                                    <Link href="#" onClick={() => { signOut() }} className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                                </li>
                            </ul>
                        </div>
                    </>
                    }
                </li>

                <li className='flex gap-3'>

                    {!session && <><Link href='/login'><button className='bg-purple-500 shadow-lg p-3 rounded-lg font-bold py-1'>Login</button></Link> <Link href='/login'><button className='bg-purple-500 shadow-lg p-3 rounded-lg font-bold py-1'>Try Now</button></Link></>}
                    {session && <Link href='#' onClick={() => { signOut() }}><button className='bg-purple-500 shadow-lg px-5 rounded-lg font-bold py-2.5'>Logout</button></Link>}

                </li>
            </ul>
        </nav>
    )
}

export default Navbar
