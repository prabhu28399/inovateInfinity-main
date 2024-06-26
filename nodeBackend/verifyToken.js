const  json  = require('express');
const jwt=require('jsonwebtoken');
const secretKey = "shivaprasadrameshprabhupriya";


const verifyToken=(req,res,next)=>{
    const token=req.headers['authorization']
    console.log("token is",token);
    if(!token){
        res.status(403).send("A token is required for authentication")
    }else{
        try{
            const decodedToken=jwt.verify(token,secretKey)
            req.decodedToken=decodedToken
        }catch{
            res.json({status:"error",data:"Somthing went wrong"})
        }
    }
    return next();
}

module.exports=verifyToken;