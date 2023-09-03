var express = require('express');
var router = express.Router();
var userModel=require('../common/userSchema')
var dburl=require('../common/dbconfig')
const mongoose=require('mongoose')
mongoose.connect(dburl)


/* GET home page. */
router.use(express.json())


router.get('/',async(req,res)=>{
  try {
    var data=await userModel.find()
    res.status(200).send(data)
  } catch (error) {
    res.status(400).send({message:error})
  }
})

router.get('/filtereddata',async(req,res)=>{
  try {    
    if(req.body.selectedyear && req.body.selectedmonth && req.body.selectedcategory && req.body.selectedpurpose){
      var data=await userModel.find({year:req.body.selectedyear, month:req.body.selectedmonth, category:req.body.selectedcategory,purpose: req.body.selectedpurpose});
    }else if(req.body.selectedyear && req.body.selectedmonth && req.body.selectedcategory){
      var data=await userModel.find({year:req.body.selectedyear, month:req.body.selectedmonth, category:req.body.selectedcategory});
    }else if(req.body.selectedyear && req.body.selectedmonth && req.body.selectedpurpose){
      var data=await userModel.find({year:req.body.selectedyear, month:req.body.selectedmonth,purpose: req.body.selectedpurpose});
    }else if(req.body.selectedyear && req.body.selectedcategory && req.body.selectedpurpose){
      var data=await userModel.find({year:req.body.selectedyear, category:req.body.selectedcategory,purpose: req.body.selectedpurpose});
    }else if(req.body.selectedmonth && req.body.selectedcategory && req.body.selectedpurpose){
      var data=await userModel.find({month:req.body.selectedmonth, category:req.body.selectedcategory,purpose: req.body.selectedpurpose});
    }else if(req.body.selectedyear && req.body.selectedmonth){
      var data=await userModel.find({year:req.body.selectedyear, month:req.body.selectedmonth});
    }else if(req.body.selectedmonth && req.body.selectedcategory){
      var data=await userModel.find({month:req.body.selectedmonth, category:req.body.selectedcategory});
    }else if(req.body.selectedcategory && req.body.selectedpurpose){
      var data=await userModel.find({category:req.body.selectedcategory,purpose: req.body.selectedpurpose});
    }else if(req.body.selectedyear && req.body.selectedpurpose){
      var data=await userModel.find({year:req.body.selectedyear,purpose: req.body.selectedpurpose});
    }else if(req.body.selectedyear && req.body.selectedcategory){
      var data=await userModel.find({year:req.body.selectedyear, category:req.body.selectedcategory});
    }else if(req.body.selectedmonth && req.body.selectedpurpose){
      var data=await userModel.find({month:req.body.selectedmonth ,purpose: req.body.selectedpurpose});
    }else if(req.body.selectedyear){
      var data=await userModel.find({year:req.body.selectedyear});
    }else if(req.body.selectedmonth){
      var data=await userModel.find({month:req.body.selectedmonth});
    }else if(req.body.selectedcategory){
      var data=await userModel.find({category:req.body.selectedcategory});
    }else if(req.body.selectedpurpose){
      var data=await userModel.find({purpose: req.body.selectedpurpose});
    }
    res.status(200).send(data)
    console.log("57  ......",req.body.selectedyear ,  req.body.selectedmonth , req.body.selectedcategory , req.body.selectedpurpose)
  } catch (error) {
    res.status(400).send({message:error})
  }
})
router.get('/totaldata',async(req,res)=>{
  try {
    var data=await userModel.find()
    res.status(200).send(data)
  } catch (error) {
    res.status(400).send({message:error})
  }
})

router.delete('/:id',async(req,res)=>{
  try {
    var {id}=req.params;
    console.log(id)
    var data=await userModel.deleteOne({_id:id});
    res.status(200).json({message:"transaction deleted",data:data})
  } catch (error) {
    res.status(400).json({message:error})
  }
})



router.post('/addincome',async(req,res)=>{
  console.log(req)
  const d = new Date();
  var date=d.toDateString()
  try {
    let data={
      amount:req.body.incomeamount,
      type:"income",
      description:req.body.incomedescription,
      category:req.body.incomecategory,
      purpose:req.body.incomepurpose,
      year:d.getFullYear(),
      month:date.slice(4,7),
      date:d.getDate(),
      createdtime: +new Date(),
      editabletill: +new Date()+ (12*60*60*1000)
    }
    console.log(data)
    await userModel.create(data);
    var responsedata=await userModel.find()
    res.status(200).json({message:"money added",data:responsedata})
  } catch (error) {
    res.status(400).json({message:error})
    console.log(error)
  }
})

router.post('/addexpense',async(req,res)=>{
  const d = new Date();
  var date=d.toDateString()
  try {     
    
    if(req.body.totalbalance-req.body.expenseamount >= 0){
      let data={
        amount:req.body.expenseamount,
        type:"expense",
        description:req.body.expensedescription,
        category:req.body.expensecategory,
        purpose:req.body.expensepurpose,
        year:d.getFullYear(),
        month:date.slice(4,7),
        date:d.getDate(),
        createdtime: +new Date(),
        editabletill: +new Date()+ (12*60*60*1000)
      }
      console.log(data)
      await userModel.create(data);
      var responsedata=await userModel.find()
      res.status(200).json({message:"expense added",data:responsedata})
    }else{
      res.status(200).json({message:"Insufficient Balance"})
    }
  } catch (error) {
    res.status(400).json({message:error})
    console.log(error)
  }
})

module.exports = router;
