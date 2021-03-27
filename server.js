const express = require('express');
const mongoose = require('mongoose');
const dataBase = require('./config/database').MongoUri
const UserController = require('./models/UserController')
const app =  express();
// DataBase connect
mongoose.connect(dataBase,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('MongoDB connected....'))
    .catch(err=>console.log(err))

app.use('/users',UserController)

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`Server up and Running.. at ${PORT}`);
})

module.exports = app