const mongoose=require('mongoose');
var login=new mongoose.Schema({
			name:String,
            email:String,
            password:String

});
module.exports=mongoose.model("Login",login);