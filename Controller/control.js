var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const lock = require('../dbModel/Schema')


router.get('/find',function(req,res,next){
  // this show the all user
  /*lock.find({}).then(function(lock){
    res.send(lock)

  }).catch(next);*/

  lock.geoNear(
    {type:'Point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},//http://localhost:5600/api/find/?lng=43&&lat=34
    {maxDistance:100000,spherical:true}//100000 what max distance from this point this is 100 thousand meter
  ).then (function(lock){
    res.send(lock);

  });
  


});



router.post('/insert',function(req,res,next){
  //console.log("argument",req.body);
 lock.create(req.body).then(function(lock){
    res.send(lock);

 }).catch(next);
//lock.create(req.body);
//res.send({type:'POST' ,  name: req.body.name,rank : req.body.rank})
});

router.delete('/delete/:id',function(req,res,next){//http://localhost:5600/api/delete/5afac1e017076500d8ffec58
 lock.findByIdAndRemove({_id:req.params.id}).then(function(lock){
    res.send(lock);

 }).catch(next);

});




router.put('/update/:id',function(req,res,next){//http://localhost:5600/api/update/5afac0faee2e27540c4b3934
 /*lock.findByIdAndUpdate({_id:req.params.id},req.body).then(function(lock){
    res.send(lock);// this will send us the previous data in response although in table it has been updated so we need to get the latets we need a little bit change

 }).catch(next);*/
 lock.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
   lock.findOne({_id:req.params.id}).then(function(lock){
       res.send(lock);

   });

 }).catch(next);
});



module.exports = router;
