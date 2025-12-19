const path = require("path");
const users = require("../model/users");


function getnewuser(req,res){

// const {name,image}=req.body;



res.render('newuser')
}






function postnewuser(req,res){

const {name,image}=req.body;
console.log(name,image)
users.createuser(name,image)

  res.redirect("/");


}


module.exports={getnewuser,postnewuser}