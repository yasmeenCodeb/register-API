const express=require("express");
const router=express.Router();
const PostsController=require("./controller/Posts");
const AuthController=require("./controller/Auth");
const checkSignIn=require("./controller/Auth");


router.get('/testauthroute',checkSignIn.isSignedIn,(req,res)=>{
    res.send("Protected route")
    })

// router.get('/data', decoded.me,(req,res)=>{
//     res.send("Data");
// })


router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.get('/posts',checkSignIn.isSignedIn, PostsController.getPost);
router.post('/posts/create',checkSignIn.isSignedIn, PostsController.createPost);


router.get('/', (req, res)=>{
    res.send("Hello, I am router");
})

module.exports=router;