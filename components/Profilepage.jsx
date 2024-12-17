"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useRouter, useSearchParams, notFound } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchusername } from '@/actions/useractions'

const Profilepage = () => {

    const [currentuser, setcurrentuser] = useState({});
    const [name, setName] = useState("")
    const searchParams = useSearchParams();
    const { data: session, update } = useSession()
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/login')
        }
        else {
            getData();
        }
    }, [session, router])

    const getData = async () => {
        if (session?.user?.name) {
            let u = await fetchuser(session.user.name);
            let n = await fetchusername(u.username);
            console.log(n);
            setcurrentuser(u);
            setName(n);
        }
    }

    // const handleChange = (e) => {
    //     setForm({ ...currentuser, [e.target.name]: e.target.value })
    // }

    return (
        <div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg '>

            <h1 className='text-2xl font-bold'><u>Your Profile</u></h1>

            <div className='my-6 flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='font-bold'>Name:</label>
                    <span>{name}</span>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="username" className='font-bold'>Username:</label>
                    <span>{currentuser.username}</span>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='font-bold'>Email:</label>
                    <span>{currentuser.email}</span>
                </div>
            </div>
        </div>
    )
}

export default Profilepage