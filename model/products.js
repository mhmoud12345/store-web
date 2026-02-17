const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category:{
    type:String,
    required:false,
  }
});


productSchema.statics.feichAllproducts = function() {

  return this.find();

}

 productSchema.methods.postproduct   =async function(Name, Price, Image, Description,category) {
  // console.log(Name,Price,Description,Image)
  await this.create({
    name: Name,
    image: Image,
    description: Description,
    category: category,
    price: Price
  });

  return product
    .save()
    .then(() => {
      console.log("product saved!");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}


 productSchema.methods.findproduct=function(_id) {
  return ProductModel.findById(_id)
    .then((pro) => {
      console.log(pro);
      return pro;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
 productSchema.methods.updateproduct=function(name, price, imageUrl, description, _id, category) {
  ProductModel.findByIdAndUpdate(
    { _id: _id },
    {
      name: name,
      price: price,
      category:category,
      image: imageUrl,
      description: description,
    }
  )
    .then((r) => console.log("edit updated"))
    .catch((err) => console.log(err));
}

productSchema.methods.deleteproduct=async function(_id) {
    return await ProductModel.findByIdAndDelete(_id)
    .then((r) => console.log("deleted  well"))
    .catch((err) => console.log("errrrrr", err));
}

module.exports = mongoose.model("Product", productSchema);
