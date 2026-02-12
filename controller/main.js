const path = require("path");
const products = require("../model/products");
const Category=require("../model/productscategory")

async function getAllpruducts(req, res) {
  const data = await products.feichAllproducts();
  // console.log("data from db", data);

  res.render("main", { product: data });
}

function addproduct(req, res) {
  Category.feichAllcategory().then((cat) => {
    res.render("newproduct",{cat:cat});
  });
}

function postproduct(req, res) {
  console.log("body:", req.body);
  const { name, price, imageUrl, description,category } = req.body;

  products
    .postproduct(name, price, imageUrl, description,category)
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving product");
    });
}

async function geteditproduct(req, res) {
  const productid = req.params._id;
  const cat = await Category.feichAllcategory();
  try {
    const product = await products.findproduct(productid);
    res.render("neweditedproduct", { product: product, cat: cat });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching product");
  }
}

async function posteditproduct(req, res) {
  console.log("body:", req.body);
  const { name, price, imageUrl, description, _id, category } = req.body;

  await products.updateproduct(name, price, imageUrl, description, _id, category);

  res.redirect("/");
}

async function getdeleteproduct(req, res) {
  const _id = req.params._id;

  try {
    const product = await products.findproduct(_id);
    res.render("deleteproduct", { product: product });
  } catch (err) {
    console.log(err);
  }
}

function postdeleteproduct(req, res) {
  const _id = req.body._id;

  products.deleteproduct(_id);

  res.redirect("/");
}

async function getdetails(req, res) {
  const _id = req.params._id;

  const product = await products.findproduct(_id);

  console.log(product);
  res.render("productdetails", { product: product });
}

async function getAddCategory   (req, res)  {
  try {
    const categories = await Category.feichAllcategory();

    res.render("addcategory", { categories:categories });
  } catch (err) {
    console.log(err);
    res.send("Error loading categories");
  }
};


async function postAddCategory   (req, res)  {
  try {
    const { name } = req.body;

    await Category.addcategory(name);

    res.redirect("/admin/categories");
  } catch (err) {
    console.log(err);
    res.send("Error saving category");
  }
};

module.exports = {
  getAllpruducts,
  addproduct,
  postproduct,
  geteditproduct,
  posteditproduct,
  getdeleteproduct,
  postdeleteproduct,
  getdetails,
  getAddCategory
  ,postAddCategory
};
