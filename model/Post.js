const mongoose =require("mongoose");

const PostsSchema=new mongoose.Schema({
    name:{
        type:"String",
        required: true
    },
    email:{
        type:"String",
        required: true
    },
    createdBy:{
        type:"String",
        required: true
    }
})

module.exports=mongoose.model("Posts", PostsSchema);