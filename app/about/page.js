import React from 'react'

const page = () => {
  return (
    <div>
    <div className='mx-auto max-w-3xl bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4'>
    <h1 className='text-2xl font-bold'>About Us:</h1>

    <div className='flex flex-col gap-3'>
      <p>Welcome to <b>BitLinks</b>, your go-to solution for simplifying and managing long URLs. Our mission is to make sharing links effortless, organized, and accessible.</p>

      <p>Whether you’re a digital marketer, content creator, or casual user, our platform offers:</p>

      <ul className='flex flex-col gap-3 my-2'>
        <li><b>Effortless Link Shortening:</b> Convert lengthy URLs into compact, shareable links in seconds.</li>

        <li><b>Analytics Dashboard: </b> Gain insights into link performance with real-time click tracking.</li>

        <li><b>Custom Short Links:</b> Personalize your URLs to match your brand or content.</li>

        <li><b>Security First:</b> We prioritize your privacy and ensure secure redirections.</li>
      </ul>
    </div>

    <div className='flex flex-col gap-2 my-3'>
        <p>Built with modern web technologies, our app is optimized for speed, reliability, and ease of use. We’re constantly evolving to meet your needs and stay ahead in the digital landscape.</p>

        <p>Thank you for choosing <b>BitLinks</b>! Let’s make your links work harder and smarter.</p>
    </div>
  </div>
  </div>
  )
}

export default page
