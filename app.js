const express=require("express");
const path=require("path");
const app =express();
const port=8000;
//Mongoose start to store data in mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema= new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);


//Express specific stuff
//app.use(express.static('static', options))
app.use('/static',express.static('static'));//for serving static file
app.use(express.urlencoded());

//PUG specific stuff
app.set('view engine', 'pug');//set the template engine as pug
app.set('views',path.join(__dirname,'views'));//set the views directory

//EndPoint
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body)
    myData.save().then(()=>{
        res.send("You data are stored in database")
    }).catch(()=>{
        res.status(404).send("Data was not stored to the database")
    })
    //res.status(200).render('contact.pug')
})

// start server
app.listen(port,()=>{
    console.log(`The appliaction started succesfully on port ${port}`);
});