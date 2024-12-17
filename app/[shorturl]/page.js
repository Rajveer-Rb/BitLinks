import React from 'react'
import { redirect } from 'next/navigation'
import clientPromise from '@/lib/mongodb'

export default async function Page({params}) {

    const shorturl = (await params).shorturl;         // extract shorturl from params of request
    const client = await clientPromise;
    const db = client.db('bitlinks');                 // db name 'bitlinks'
    const collection = db.collection("url");          // collection name 'url'

    const preExist = await collection.findOne({shorturl: shorturl});      // check in database
    if(preExist) {
        redirect(preExist.url);
    }
    else {
        redirect(process.env.NEXT_PUBLIC_HOST);                            // .env.local
    }
    return <div>My Post: {shorturl}</div>
}