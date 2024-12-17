import clientPromise from "@/lib/mongodb";

export async function POST(request) {

    const body = await request.json()                 // req.body

    if(!body.name || !body.username || !body.email) {
        return Response.json({success: false, error: true, message: 'Inputs cant be empty '})
    }
    const client = await clientPromise;
    const db = client.db('bitlinks');                 // db name 'bitlinks'
    const collection = db.collection("userInfo");          // collection name 'url'
    const collection2 = db.collection("users");

    const preExist = await collection2.findOne({email: body.email});
    if(!preExist) {
        return Response.json({success: false, error: true, message: 'User does not exists'});
    }

    // check if short url exists
    await collection.insertOne({
        name: body.name,
        username: body.username,
        email: body.email,
    })

    return Response.json({success: true, error: false, message: 'Info Saved'});
}