"use server"
import connectDB from "@/db/connection"
const User = require('@/models/user')
import clientPromise from "@/lib/mongodb"

export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({username: username})
    if(!u) {
        return {error: "user not found"}
    }
    let user = u.toObject({flattenObjectIds: true})        // to flatten ids in mongodb
    return user;
}

export const fetchusername = async(username) => {

    await connectDB();
    const client = await clientPromise;
    const db = client.db('bitlinks');                 
    const collection = db.collection("userInfo"); 

    let user = await collection.findOne({username});
    let name = user.name;
    console.log(name);
    return name;
}

