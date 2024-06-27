export async function  GET(req) {

}

export async function  POST(req,res) {
    const {username, password} = await req.json();
    console.log(username, password);
}