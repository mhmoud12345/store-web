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
});

const ProductModel = mongoose.model("Product", productSchema);

function feichAllproducts() {
  return ProductModel.find();
}

function postproduct(Name, Price, Image, Description) {
  // console.log(Name,Price,Description,Image)
  const product = new ProductModel({
    name: Name,
    image: Image,
    description: Description,
    price: Price,
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

function findproduct(_id) {
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
function updateproduct(name, price, imageUrl, description, _id) {
  ProductModel.findByIdAndUpdate(
    { _id: _id },
    {
      name: name,
      price: price,
      image: imageUrl,
      description: description,
    }
  )
    .then((r) => console.log("edit updated"))
    .catch((err) => console.log(err));
}

async function deleteproduct(_id) {
  await ProductModel.findByIdAndDelete(_id)
    .then((r) => console.log("deleted  well"))
    .catch((err) => console.log("errrrrr", err));
}

module.exports = {
  feichAllproducts,
  postproduct,
  findproduct,
  updateproduct,
  deleteproduct,
};
