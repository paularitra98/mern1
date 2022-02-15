const express=require('express');
const router=express.Router();
//const dbobj=require('../db.js');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');


const Customer=require('../model/customer.js');
const Login=require('../model/login.js');

router.post('/ins',async (req,res)=>{

	var img=req.files.pimg;
	var fn=Math.floor(Math.random() * 100000)+img.name;
	img.mv("./public/image_upload/"+fn,
		async (err)=>{
			if(err){
				throw err;
			}
			else{

				
				// console.log(img.name);
				// console.log(req.body);


				var insobj={
					name:req.body.name,
					email:req.body.email,
					gender:req.body.gender,
					stream:req.body.stream,
					language:req.body.language,
					pimg:fn


				}
          await Customer.create(insobj);

				//dbobj.ins_user(insobj,res);
			}
		});
	
	var obj={
	msg:"form submitted"
};
	res.json(obj);
});



router.get('/sel',async (req,res)=>{
	//dbobj.sel_user(res);
	var result=await Customer.find();
	res.json(result);

});


router.post('/del',async (req,res)=>{

	//dbobj.del_user(req.body.id,res);
     await Customer.findByIdAndDelete(req.body.id);  
	res.json({msg:"deleted"});
});

router.post('/edit',async (req,res)=>{
	//dbobj.edit_user(req.body.id,res);
	var result=await Customer.findById(req.body.id);
	res.json(result);

});

router.post('/update',async (req,res)=>{
	if(req.files!=null){
	var img=req.files.pimg;
	var fn=Math.floor(Math.random() * 100000)+img.name;
	img.mv("./public/image_upload/"+fn,
		async (err)=>{
			if(err){
				throw err;
			}
			else{

				
				// console.log(img.name);
				// console.log(req.body);


				var insobj={
					name:req.body.name,
					email:req.body.email,
					gender:req.body.gender,
					stream:req.body.stream,
					language:req.body.language,
					pimg:fn


				}
				//dbobj.update_user(req.body.id,insobj,res);
				await Customer.findOneAndUpdate({_id:req.body.id},insobj);
				res.json({msg:"updated succesfully"});
			}
		});
	  
	}else{
		var insobj={
			name:req.body.name,
			email:req.body.email,
			gender:req.body.gender,
			stream:req.body.stream,
			language:req.body.language,
		


		}
		//dbobj.update_user(req.body.id,insobj,res);
		await Customer.findOneAndUpdate({_id:req.body.id},insobj);
				res.json({msg:"updated succesfully"});
	}
	
	
});

router.post('/signup',async (req,res)=>{
	
		//console.log(req.body);
		const saltRounds = 10;
		var hashPwd = await bcrypt.hash(req.body.password,saltRounds);
		var regobj={
			name:req.body.name,
			email:req.body.email,
			password:hashPwd


		}
		//dbobj.reg_user(regobj,res);
		await Login.create(regobj);

		var obj={
			msg:"Successfully register"
		};
			res.json(obj);

	
});

router.post('/login',async (req,res)=>{

	//dbobj.log_user(req.body.email,req.body.password,res);

	// "find" always returs array
	// "findOne" always returs object

	var result=await Login.find({email:req.body.email});
	if(result.length>0){
		bcrypt.compare(req.body.password,result[0].password,(err,resl)=>{
			if(err){
				throw err;
			}
			else{
				if(resl==true){
					// res.json(result[0]);


					var obju={
						name:result[0].name,
						email:result[0].email,
						id:result[0]._id
					}

					var utoken=jwt.sign(obju,process.env.SALT);
					res.json({jwttoken:utoken});


				}
				else{
					res.json({msg:"invalid logins"});
				}
			}
		})

	}else{
		res.json({msg:"invalid login"});
	}

});


router.get("/getuser",authmiddleware,(req,res)=>{

	jwt.verify(req.token,process.env.SALT,(err,udata)=>{
		if(err){
			throw err;
			res.json({msg:"Access denied dhghghc"});

		}
		else{
			res.json(udata);
		}
	})

})

function authmiddleware(req,res,next){
	const ftoken=req.headers.authorization;
	if(typeof ftoken != 'undefined'){
		const tokenv=ftoken.split(' ')[1];
		req.token=tokenv;
		next();
	}
	else{
		res.json({msg:"Access denied"});
	}
}



module.exports=router;