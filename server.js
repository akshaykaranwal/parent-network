const express = require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const userRoutes=require('./routes/userRoutes.js');
const postRoutes=require('./routes/postRoutes');
const circleRoutes=require('./routes/circleRoutes');
const replyRoutes=require('./routes/replyRoutes');
const r2r=require('./routes/r2r')
const upvotesRoutes=require('./routes/upvoteRoutes');

dotenv.config();

const app=express();

app.use(express.json())

const connect = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to database');
})
.catch((error)=>{
    console.log('Error:',error);
})

const PORT=process.env.PORT || 3000;

app.use('/api/users',userRoutes); // http://localhost:3000/api/users 
app.use('/api/posts',postRoutes);
app.use('/api/circles',circleRoutes);
app.use('/api/replies',replyRoutes);
app.use('/api/r2r',r2r);
app.use('/api/vote',upvotesRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})