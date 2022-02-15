var MongoClient = require('mongodb').MongoClient
var mongo=require('mongodb');
var fs=require('fs');
const bcrypt=require('bcrypt');

MongoClient.connect('mongodb+srv://aritra:a123456@cluster0.r8cvt.mongodb.net/mern1?retryWrites=true&w=majority',{useUnifiedTopology:true}, function (err, client) {

  if (err){
	throw err;
  }else{
	  console.log("connected");
  } 

  var db = client.db('mern1');	//database name

	exports.ins_user=(inso,res)=>{
		db.collection("admin").insertOne(inso,(err,success)=>{
			if(err){
				throw err;
			}
			else{
				var out={msg:"record inserted"}
				res.json(out);
			}
		})

	}
  
  exports.sel_user=(res)=>{
  	db.collection("admin").find().toArray((err,result)=>{
  		if(err){
  			throw err;
  		}
  		else{
  			res.json(result);
  		}
  	});
  }
  exports.del_user=(id,res)=>{
	  var cond={_id:new mongo.ObjectId(id)};
	  db.collection("admin").findOne(cond,(err,result)=>{
		  if(err){
			  throw err;
		  }
		  else{
			  fs.unlinkSync("./public/image_upload/"+result.pimg);
		  }

	  })
	  db.collection("admin").deleteOne(cond,(err,success)=>{
		  if(err){
			  throw err;
		  }
		  else{
			  res.json({msg:"deleted"});
		  }
	  });

	}
	  exports.edit_user=(id,res)=>{
		var cond={_id:new mongo.ObjectId(id)};
		db.collection("admin").findOne(cond,(err,result)=>{
			if(err){
				throw err;
			}
			else{
				res.json(result);
			}
		});
	  }


   exports.update_user=(id,insobj,res)=>{
	var cond={_id:new mongo.ObjectId(id)};
	var newv={$set:insobj};
	db.collection("admin").updateOne(cond,newv,(err,suc)=>{
		if(err){
			throw err;
		}else{
			res.json({msg:"updated"});
		}
	})
   }


   exports.reg_user=(regs,res)=>{
	db.collection("register").insertOne(regs,(err,success)=>{
		if(err){
			throw err;
		}
		else{
			var out={msg:"registered"}
			res.json(out);
		}
	})

}

exports.log_user=(e,p,res)=>{
	var cond={email:e};
	db.collection("register").find(cond).toArray((err,result)=>{
		if(err){
			throw err;
		}
		else{
			if(result.length>0){
				bcrypt.compare(p,result[0].password,(err,resl)=>{
					if(err){
						throw err;
					}
					else{
						if(resl==true){
							res.json(result[0]);
						}
						else{
							res.json({msg:"invalid login"});
						}
					}
				})
			}
			else{
				res.json({msg:"invalid login"});
			}
		}
	})
}
  



  // db.collection('mammals').find().toArray(function (err, result) {
  //   if (err) throw err

  //   console.log(result)
  // })



})