import jwt from 'jsonwebtoken'

export const authenticateToken=(req,res,next)=>{
    const authHeaders=req.headers.authorization;
    //console.log("auth headers")
    //console.log(authHeaders);
    //bec we have concatinate token with bearer
    const token =authHeaders&& authHeaders.split(' ')[1]
    // console.log("token")
    // console.log(token)
    if(token==null){
        return res.status(401).send({msg:'token is missing'})
    }
    jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error,user) =>{
        if(error){
            return res.status(403).json({msg:'invalid token'})
        }

        req.user = user;
        next();

    })

}