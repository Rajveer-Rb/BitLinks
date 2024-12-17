import clientPromise from "@/lib/mongodb";

export async function POST(request) {

    const body = await request.json()                 // req.body
    if(!body.url || !body.shorturl) {
        return Response.json({success: false, error: true, message: 'Inputs cant be empty'});
    }
    const client = await clientPromise;
    const db = client.db('bitlinks');                 // db name 'bitlinks'
    const collection = db.collection("url");          // collection name 'url'

    const preExist = await collection.findOne({shorturl: body.shorturl});
    if(preExist) {
        return Response.json({success: false, error: true, message: 'URL already exists'});
    }

    // check if short url exists
    await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl,
    })

    return Response.json({success: true, error: false, message: 'URL generated successfully'});
}
