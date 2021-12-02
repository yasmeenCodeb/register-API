require("dotenv").config();


const User=require("../model/User");
const jwt=require("jsonwebtoken");
const expressjwt=require("express-jwt");
const bcrypt=require("bcrypt");
const JWT_SECRET=process.env.JWT_SECRET;


require('cookie-parser');



exports.signup=async(req,res)=>{
    try{
        const { email, password }= req.body;
        if(!(email && password)) {
            return res.status(400).send("All input is required");

        }
        const oldUser=await User.findOne({ email });

        if(oldUser){
            return res.status(409).send("User Already Exists. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        const user=await User.create({
            email, password: encryptedPassword
        })

        res.status(200).json(user);
    }catch(error){
        res.status(400).json({
            error: "Please enter your email id and password"
        })
    }
}


exports.signin=async(req,res)=>{
    try{
        const{ email, password } = req.body
        const user = await User.findOne({email});

        if(!user){
            return res.json({ status: 'error', error: "Invalid username/password"})
        }
        const passwordcompare=await bcrypt.compare(password, user.password);
        if(passwordcompare){
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                JWT_SECRET,{
                    expiresIn: 86400   //expires in 24 hours
                }
            )
            return res.json({user, token: token})
        }else{
            return res.json({ status: 'error', error: 'Invalid Credentials'})
        }
    }catch(error){
        console.log(error);
    }
}


/*exports.isSignedIn=expressjwt({
    secret:JWT_SECRET,
    userProperty:"auth",
    algorithms: ['HS256'],
})
*/

exports.isSignedIn = (req, res, next) => {
    var token =
      req.headers["token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      emailId = req.user.email;
    // console.log(req.user.email);

    return next();
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }

    // var userId = decoded.id;
    // // Fetch the user by id
    //      User.findOne({_id: userId}).then(function(user){
    //         return res.json({userId})
    //      });
    }


/*
exports.me = function(req,res){

    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, JWT_SECRET);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        // Fetch the user by id
        User.findOne({_id: userId}).then(function(user){
            return res.json({email})
        });
    }
    return res.send();
}
*/