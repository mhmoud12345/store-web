const mongoose = require("mongoose");

const categoryschema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

});

const categoryModel = mongoose.model("category", categoryschema);


function addcategory(name){

const Category= new categoryModel({

name:name

})

Category.save()

}

async function feichAllcategory(){

 return await categoryModel.find()


}




module.exports={ addcategory,feichAllcategory}