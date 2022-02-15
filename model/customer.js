const mongoose=require('mongoose');

var customerSchema=new mongoose.Schema({
	name:String,
	email:String,
	gender:String,
	stream:String,
	language:String,
	pimg:String
});

module.exports=mongoose.model("Customer",customerSchema);