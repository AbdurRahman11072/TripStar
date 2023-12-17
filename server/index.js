require("dotenv").config();
const express = require("express");
const { MongoClient,ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173',
    
             'https://assinment-11-server-livid.vercel.app',
             'https://assinment-11-63419.firebaseapp.com'],
    credentials: true,
  })
);

const uri = "mongodb+srv://rahman:12345@cluster0.nxhbkwn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
  // Jwt
  app.post('/jwt', async(req, res)=>{
   try{
    const user = req.body
    const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})

    res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Adjust based on your requirements
      // maxAge: // how much time the cookie will exist
  })
    .send({success: true})
   }
   catch(err){
    console.log(err);
       }
  });

  // middleware
const verifyToken = async(req, res, next)=>{
  try{
    const token = req?.cookies?.token
  // console.log('value of token ', token);
  if(!token){
      return res.status(401).send({message: 'Not Authorized'})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
    if(err){
      // console.log(err);
      return res.status(401).send({message: 'error'})
    }
    // console.log('value in the token', decoded);
    req.user = decoded
    next()
  })

  }
  catch(err){
    console.log(err);
  }
  
}
  

  app.post('/logout', async(req, res)=>{
    try{
      const user = req.body
    res.clearCookie('token',{maxAge: 0}).send({success: true})

    }
    catch(err){
      console.log(err);
         }
  });


  const database = client.db("insertDB").collection("roomdata");
  const bookedroom = client.db("insertDB").collection("bookedroom");
  const review = client.db("insertDB").collection("reviewdata");



  // show all room data
app.get("/roomdata",async (req,res)=>{
try{
  const cursor = database.find();
const result = await cursor.toArray();
res.send(result);
}
catch (err) {
  console.log(err)
}
})

//  update room data
app.put("/roomdata/:id", async (req,res) =>{
 try{
  const id= req.params.id
  const filter = {_id:new ObjectId(id)}
  const options = { upsert: true };
  const UpdatedRooDetails = req.body;
  const roomDetails = {
    $set: {
      h_name :UpdatedRooDetails.h_name,
      h_discription :UpdatedRooDetails.h_discription,
      price :UpdatedRooDetails.price,
      room_size :UpdatedRooDetails.room_size,
      room_img :UpdatedRooDetails.room_img,
      offers :UpdatedRooDetails.offers,
      h_location :UpdatedRooDetails.h_location,
      people :UpdatedRooDetails.people,
      bed :UpdatedRooDetails.bed,
      refund :UpdatedRooDetails.refund,
      breakfast :UpdatedRooDetails.breakfast,
      r_avaliable :UpdatedRooDetails.r_avaliable,
      booked_room  :UpdatedRooDetails.booked_room
    },
  };
  console.log(res.body);
  const result = await database.updateOne(filter,roomDetails,options)
  res.send(result)
 }
 catch (err) {
  console.log(err);
}
})

// get booking data 
app.get("/bookedroom", verifyToken ,  async (req,res)=>{
  try{
 
   
    if(req.query.email !== req.user.email){
      return res.status(403).send({message: "Forbidden"})
    }
    let query = {}
    if(req.query?.email){
      query = {email: req.query.email}
    }
    const result = await bookedroom.find(query).toArray()
    res.send(result)
    
   
  }
  catch (err) {
    console.log(err)
  }
  })

  app.post("/jwt",async(res,req) =>{
   try{

    const user=req.body
    res.send(user)
   }
   catch{

   }
  
  })
   // bookedroom data
app.post("/bookedroom",  async (req,res) =>{
 try{
  const data= req.body;
  console.log(data);
  const result = await bookedroom.insertOne(data);
  res.send(result);
 }
 catch (err) {
  console.log(err);
}
})


app.put("/bookedroom/:id", async (req,res) =>{
  try{
   const id= req.params.id
   console.log(id);
   const filter = {_id:new ObjectId(id)}
   const options = { upsert: true };
   const UpdatedBookedRooDetails = req.body;
   console.log(UpdatedBookedRooDetails);
   const roomDetails = {
     $set: {
       id:UpdatedBookedRooDetails.id,
       h_name :UpdatedBookedRooDetails.h_name,
       h_discription :UpdatedBookedRooDetails.h_discription,
       price :UpdatedBookedRooDetails.price,
       room_size :UpdatedBookedRooDetails.room_size,
       room_img :UpdatedBookedRooDetails.room_img,
       offers :UpdatedBookedRooDetails.offers,
       h_location :UpdatedBookedRooDetails.h_location,
       people :UpdatedBookedRooDetails.people,
       bed :UpdatedBookedRooDetails.bed,
       refund :UpdatedBookedRooDetails.refund,
       breakfast :UpdatedBookedRooDetails.breakfast,
       r_avaliable :UpdatedBookedRooDetails.r_avaliable,
       booked_room  :UpdatedBookedRooDetails.booked_room,
       Cheack_in_date:UpdatedBookedRooDetails.Cheack_in_date,
       currentDate:UpdatedBookedRooDetails.currentDate
     },
   };
   console.log(res.body);
   const result = await bookedroom.updateOne(filter,roomDetails,options)
   res.send(result)
  }
  catch (err) {
   console.log(err);
 }
 })
 

//delete Booked Room data

app.delete("/bookedroom/:id", async (req,res) =>{
 try{
  const id= req.params.id
  const query = {_id: new ObjectId(id)}
  const result = await bookedroom.deleteOne(query)
  res.send(result)

 }
 catch (err) {
  console.log(err);
}
})


// review data 

app.get("/review",async (req,res)=>{
  try{
    const cursor = review.find();
  const result = await cursor.toArray();
  res.send(result);
  }
  catch (err) {
    console.log(err)
  }
  })

  // add review data 

  app.post("/review", async (req,res) =>{
    try{
     const data= req.body;
     console.log(data);
     const result = await review.insertOne(data);
     res.send(result);
    }
    catch (err) {
     console.log(err);
   }
   })

app.get("/", (req, res) => {
    res.send("Crud is running...");
  });

  
  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });
