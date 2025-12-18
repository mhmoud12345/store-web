const path = require("path");
const products = require("../model/products");

async function getAllpruducts(req, res) {
  const data = await products.feichAllproducts();
  // console.log("data from db", data);

  res.render("main", { product: data });
}

function addproduct(req, res) {
  res.render("newproduct");
}

function postproduct(req, res) {
  // read fields from req.body (requires express.urlencoded middleware)
  console.log("body:", req.body);
  const { name, price, imageUrl, description } = req.body;

  products
    .postproduct(name, price, imageUrl, description)
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving product");
    });
}

async function geteditproduct(req, res) {
  const productid = req.params._id;
  try {
    const product = await products.findproduct(productid);
    res.render("neweditedproduct", { product: product });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching product");
  }
}

async function posteditproduct(req, res) {
  console.log("body:", req.body);
  const { name, price, imageUrl, description, _id } = req.body;

  await products.updateproduct(name, price, imageUrl, description, _id);

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

module.exports = {
  getAllpruducts,
  addproduct,
  postproduct,
  geteditproduct,
  posteditproduct,
  getdeleteproduct,
  postdeleteproduct,
  getdetails,
};
