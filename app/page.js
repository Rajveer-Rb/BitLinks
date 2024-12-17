"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {

  const { data: session } = useSession();
  
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-2 h-[50vh]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-3xl font-bold">The best URL shortener in the market</p>
          <p className="px-28 text-center">We are the most straight forward URL Shortener around the globe. Unlike other competitors we don't ask for credentials and are straight forward for your tasks to save your precious time</p>

          <li className='flex gap-3'>
            {!session &&  <Link href='/login'><button className='bg-purple-500 shadow-lg rounded-lg font-bold py-1 p-3 text-white'>Get Started</button></Link>}
            {session && <Link href='/shorten'><button className='bg-purple-500 shadow-lg rounded-lg font-bold py-1 p-3 text-white'>Try Now</button></Link>}    
            <Link href='/github'><button className='bg-purple-500 shadow-lg rounded-lg font-bold py-1 p-3 text-white'>GitHub</button></Link>
          </li>
        </div>

        <div className="flex justify-start relative">
          <Image className="mix-blend-darken" src={"/vector.jpg"} alt="vectorImg" fill={true} />
        </div>
      </section>
    </main>
  );
}
