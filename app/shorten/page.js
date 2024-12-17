"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const page = () => {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated).then(() => {
      toast.success("Link copied to clipboard!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }).catch((error) => {
      console.error("Failed to copy text: ", error);
      toast.error("Failed to copy link.", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    });
  };

  const generateUrl = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shorturl": shortUrl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.success) {

          setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`),
          // console.log(process.env.NEXT_PUBLIC_HOST),
          setUrl(""),
          setShortUrl(""),
          // console.log(result),
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
  };

  return (
    <>

      <ToastContainer />
      {/* Same as */}

      <div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Generate your short URLs</h1>

        <div className='flex flex-col gap-3'>
          <input value={url} className='px-4 py-2 focus:outline-purple-600 rounded-md' type="text" placeholder='enter your url' onChange={e => { setUrl(e.target.value) }} />
          <input value={shortUrl} className='px-4 py-2 focus:outline-purple-600 rounded-md' type="text" placeholder='enter your preferred domain' onChange={e => { setShortUrl(e.target.value) }} />

          <button className='bg-purple-500 shadow-lg rounded-lg font-bold py-1 p-3 my-3 text-white' onClick={generateUrl}>Generate</button>
        </div>

        {generated && <> <div className='flex gap-2 items-center content-center'><span className='font-bold text-lg'>Your Link </span> <span><img onClick={copyToClipboard} src="/copy.svg" alt="" className='h-6 cursor-pointer' /></span></div>   <code> <Link target="_blank" href={generated}> {generated} </Link>  </code> </>}
      </div>
    </>
  )
}

export default page
