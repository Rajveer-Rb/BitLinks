"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {fetchuser} from '@/actions/useractions'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Dashboard = () => {

  const { data: session, update } = useSession()
  const router = useRouter();
  const [form, setForm] = useState({})
  const [name, setName] = useState("")

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
    else {
      getData();
    }
  }, [session, router])

  const getData = async () => {
    if(session?.user?.name) {
      let u = await fetchuser(session.user.name);
      setForm(u);
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const saveInfo = async () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": name,
      "username": form.username,
      "email": form.email,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch('/api/dashboard', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        setForm(""),
        setName(""),
        toast(`🦄 ${result.message}!`, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
      else {
        toast(`🦄 ${result.message}` , {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
    })
    .catch((error) => console.error(error));
  }

  return (
    <>
    <ToastContainer/>

      <div>
        <div className='mx-auto max-w-lg bg-purple-100 mt-16 my-5 p-8 rounded-lg flex flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>

          <div className='flex flex-col gap-3'>
            <input className='px-4 py-2 focus:outline-purple-600 rounded-md' type="text" name='name' placeholder='name' value={name} onChange={e => { setName(e.target.value) }} />
            <input className='px-4 py-2 focus:outline-purple-600 rounded-md' type="text" name='username' placeholder='username' value={form.username ? form.username : ""} onChange={handleChange} />
            <input className='px-4 py-2 focus:outline-purple-600 rounded-md' type="text" name='email' placeholder='email' value={form.email ? form.email : ""} onChange={handleChange} />

            <button className='bg-purple-500 shadow-lg rounded-lg font-bold py-1 p-3 my-3 text-white' onClick={saveInfo}>Save</button>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-lg text-sm'>
        <span>Skip for now? Go to <u><b><Link href={'/'}>Home</Link></b></u></span>
      </div>
    </>
  )
}

export default Dashboard