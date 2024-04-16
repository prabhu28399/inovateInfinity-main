// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const secretKey = "shivaprasadrameshprabhupriya";
// const expiresIn = "1h";
// const verifyToken=require('../verifyToken');
// const authModelSchema = require('../models/authModel');

// const generateAuthToken = (_id, email) => {
//     return jwt.sign({ _id, email }, secretKey, {
//         expiresIn,
//     });
// };

// const hashPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     return bcrypt.hash(password, salt);
// };

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const userFound = await authModelSchema.findOne({ email });

//         if (userFound && userFound._id) {
//             const passwordMatch = await bcrypt.compare(password, userFound.password);

//             if (passwordMatch) {
//                 const authToken = generateAuthToken(userFound._id, userFound.email);
//                 res.json({ status: "success", data: { authToken, userFound } });
//             } else {
//                 res.json({ status: "fail", data: { userFound, response: "Password does not match" } });
//             }
//         } else {
//             res.json({ status: "fail", data: "User not found" });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ status: 'error', data: 'Something went wrong' });
//     }
// });

// router.get('/dashboard',verifyToken,async(req, res) => {
//     if(req && req.decodedToken){
//         res.json({status:'success',data:"ok"});
//     }else{
//         res.json({status:'error',data:"fail"});
//     }

// })

// router.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const hashedPassword = await hashPassword(password);

//         const registerUserData = {
//             username,
//             email,
//             password: hashedPassword,
//         };

//         const userStoredData = await authModelSchema.create(registerUserData);

//         res.json({ status: "success", data: userStoredData });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ status: 'error', data: 'Something went wrong' });
//     }
// });

// module.exports = router;





const express =require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt =require('jsonwebtoken');
const authModelSchema=require('../models/authModel');
const secretKey="prasadshiva";
const verifyToken = require('../verifyToken');

router.post('/login',async (req,res)=>{
    const email =req.body.email
    const password=req.body.password
    await authModelSchema.findOne({email:email}).then(exitUser=>{
        console.log('exist user',exitUser)
        if(exitUser && exitUser._id){
            bcrypt.compare(password, exitUser.password,function(err,response){
                if(!err){
                    if(response){
                        const authToken=jwt.sign({_id:exitUser._id ,email : exitUser.email},secretKey,{
                            expiresIn:'1d'
                        } )
                        res.json({status:'ok',data:{authToken,response,exitUser}})
                    }else if(!response){
                        res.json({status:"ok",data:{exitUser,response}})
                    }
                }
            })
        }
    }).catch(err =>{
        res.json({status:"error",data:"somthing went wrong"})
    })
})
router.post('/register',async(req,res)=>{
    const registerUserData={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    }
    const salt =await bcrypt.getSalt(10)
    await bcrypt.hash(req.body.password,salt).then(hashedPassword=>{
        if(hashedPassword){
            console.log('hased Password', hashedPassword);
            registerUserData.password=hashedPassword
        }
    })
    await authModelSchema.create(registerUserData).then(userStoredData=>{
        if(userStoredData && userStoredData._id){
            console.log('user created ', userStoredData)
            res.json({status:'ok',data:userStoredData})
        }
    }).catch(err=>{
        if(err){
            res.json({status:'error',data:err})
        }

    })
})
router.get('/dashboard',verifyToken,async(req, res) => {
    if(req && req.decodedToken){
        res.json({status:'success',data:"ok"});
    }else{
        res.json({status:'error',data:"fail"});
    }

})

module.exports=router;