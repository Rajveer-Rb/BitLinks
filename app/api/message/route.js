import clientPromise from "@/lib/mongodb";

export async function POST(request) {

    const body = await request.json()                 // req.body

    if( !body.email || !body.message) {
        return Response.json({success: false, error: true, message: 'Inputs cant be empty '})
    }
    const client = await clientPromise;
    const db = client.db('bitlinks');                 // db name 'bitlinks'
    const collection = db.collection("messages");          // collection name 'url'
    const collection2 = db.collection('users');
    
    const userExist = await collection2.findOne({email: body.email});
    if(userExist) {
        await collection.insertOne({
            email: body.email,
            message: body.message
        })
        return Response.json({success: true, error: false, message: 'message sent successfuly'});
    }
    else {
        return Response.json({success: false, error: true, message: 'provided email is not a logged in user'});
    }
}
