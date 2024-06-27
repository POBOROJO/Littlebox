import jwt from "jsonwebtoken";

// this is a middleware to authenticate the user

export const authenticateUser = (req,res,next)=>{
    //* here we will check if the user is authenticated or not
    try{
        const token = req.headers.token;
        if(!token){
            res.status(403).json({
                success:false,
                message:"Please login first"
            })
        }
        //* here we will verify the token and decode it
        //* JWT -> has 3 parts: header: this is the token, payload: this is the user id, signature: this is the secret key

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                res.status(401).json({
                    success:false,
                    message:"Invalid token, Retry login"
                })
            }
            req.userId= decoded; // here we will store the user id in the request and pass it to the next middleware
            next();
        })
    }
    catch(error){
        console.log(error); 
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}