"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchuser } from '@/actions/useractions'
import { useSession, signIn, signOut } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const page = () => {

  const { data: session, update } = useSession()
  const router = useRouter();
  const [form, setForm] = useState({})
  const [message, setMessage] = useState("")

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
      setForm(u);
    }
  }

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const sendMessage = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": form.email,
      "message": message,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch('/api/message', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setForm(""),
            setMessage(""),
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
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <ToastContainer />

      <div>
        <div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Contact Us</h1>

          <div className='flex flex-col gap-3'>
            <input value={form.email ? form.email : ""} onChange={handleChange} className='px-4 py-2 focus:outline-purple-600 rounded-md' type="text" placeholder='email' />
            {/* <input className='px-4 py-2 focus:outline-purple-600 rounded-md' type="text" placeholder='leave your message' /> */}
            <textarea value={message} className='px-4 py-6 focus:outline-purple-600 rounded-md' name="message" id="message" placeholder='leave your message here' onChange={e => { setMessage(e.target.value) }}></textarea>

            <button className='bg-purple-500 shadow-lg rounded-lg font-bold py-1 p-3 my-3 text-white' onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
