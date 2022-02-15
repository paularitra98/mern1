const express=require('express');
const router=express.Router();

router.get('/ins',(req,res)=>{
	res.send("Product insert");
});

router.get('/sel',(req,res)=>{
	res.send("Product select");
});
module.exports=router;