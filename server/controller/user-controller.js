import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import tokenModel from "../models/tokenModel.js";

dotenv.config()

export const signupUser=async(req,res)=>{
    try {
        console.log("fhwef")
        const hashedPassword=await bcrypt.hash(req.body.password,10);

        const user={username:req.body.username,name:req.body.name,password:hashedPassword,role:"0"};
        console.log(user)
        const newUser=await new userModel(user).save()
        return res.status(200).json({msg:"signup successfull"})
    } catch (error) {
        return res.status(500).json({msg:`error while signup ${error}`})
    }
}

export const loginUser=async(req,res)=>{
    try {
        console.log("eopf")
        let user=await userModel.findOne({username:req.body.username})
        console.log(user)
        if(!user){
            return res.status(400).json({msg:"Username dosn't match"})
        }
        console.log("user finded")
        let match=await bcrypt.compare(req.body.password,user.password)
        
        if(match){
            console.log("matched")
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'})
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY)

            await new tokenModel({token:refreshToken}).save()
            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,user:user.name,username:user.username,role:user.role})
        }else{
            res.status(400).json({msg:"password dose not match"})
        }
    } catch (error) {
        return res.status(500).json({msg:`Error while login user ${error}`})
    }
}