const express=require('express');
const router=express.Router();


router.post('/payins', async (req,res)=>{
    console.log(req.body);

    res.json({msg:'successfully paid'});

})
module.exports=router;