const Posts=require("../model/Post")


exports.createPost=async(req, res)=>{
    try{
        const post=new Posts({
            name:req.body.name,
            email:req.body.email
        })
    
        const postsave=await post.save();
        res.json(postsave)
    }catch(error){
        console.log(error);
        res.status(400).send();
    }
}


exports.getPost=async(req,res)=>{
    try{
        const posts=await Posts.find()
        res.json(posts)
    }catch(error){
        res.status("Error", error)
    }
}