const express=require("express");
const router=express.Router();
const PostsController=require("./controller/Posts");
const AuthController=require("./controller/Auth");
const checkSignIn=require("./controller/Auth");


router.get('/testauthroute',checkSignIn.isSignedIn,(req,res)=>{
    res.send("A protected route");
    res.json(req.auth)
    })


router.post('/signup',AuthController.signup);
router.post('/signin',AuthController.signin);
router.get('/posts',PostsController.getPost);
router.post('/posts/create',PostsController.createPost);


router.get('/', (req, res)=>{
    res.send("Hello, I am router");
})

module.exports=router;