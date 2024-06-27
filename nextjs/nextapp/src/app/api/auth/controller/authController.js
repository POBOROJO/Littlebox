import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res) => {
    try{
        const token = req.headers.token;
        if(!token){
            return res.status(403).json({
                success:false,
                message:"Please login first"
            })
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                return res.status(401).json({
                    success:false,
                    message:"Invalid token, Retry login"
                })
            }
            req.userId= decoded; // here we will store the user id in the request and pass it to the next middleware
            next();
        })
    }catch(err){
        console.log(err); 
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })  
    }
}
