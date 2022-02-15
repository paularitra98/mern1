const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser = require('body-parser');
const fileupload=require('express-fileupload');


require("dotenv").config();


mongoose.connect('mongodb+srv://aritra:a123456@cluster0.r8cvt.mongodb.net/mern1?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const app=express();


app.set('view engine','ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(fileupload());

app.use(express.static('public'));//convert public folder to static folder



const ur=require("./routes/user");
const pr=require("./routes/product");
const pay=require('./routes/payment');

app.get("/",(req,res)=>{
	res.send(process.env.ABC);
});

app.use("/shop",(req,res,next)=>{
	if(10==11){
			res.send("error Access denied");
	}else{
		next();
	}

});

app.get("/shop",(req,res)=>{
	// res.send("this is shop page");
	var obj={
		name:'Jack'
	};
	res.render('aritra',obj);
});



app.use("/user",ur);
app.use("/product",pr);
app.use("/payment",pay);

app.listen(2000);