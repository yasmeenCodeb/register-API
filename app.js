require("dotenv").config();


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const allRouter=require('./routes');
const PORT=process.env.PORT;


//what is middleware in express
app.use(express.json());
app.use('/',allRouter);


mongoose
.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=>{
    console.log("DB CONNECTED");
})
app.use('/',(req, res)=>{
    res.send("Hello World")
})

const port=5000
app.listen(port,()=>{
    console.log(`App is listening on port ${PORT}`);
})