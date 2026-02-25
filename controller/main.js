const path = require("path");
const products = require("../model/products");
const Category=require("../model/productscategory")

async function getAllpruducts(req, res) {
  const data = await products.feichAllproducts();
  const cats = await Category.feichAllcategory();
  res.render("main", { product: data, categories: cats });
}

// render just the new arrivals (flagged isNew)
async function getNewProducts(req, res) {
  try {
    const data = await products.findNew();
    const cats = await Category.feichAllcategory();
    res.render("main", { product: data, categories: cats });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading new products");
  }
}

// show all products within a category
async function getCategoryProducts(req, res) {
  const category = req.params.category;
  try {
    const data = await products.find({ category });
    const cats = await Category.feichAllcategory();
    res.render("categoryproduct", { product: data, categories: cats, categoryName: category });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading category products");
  }
}

// simple cart implementation stored in session
function addToCart(req, res) {
  const prodId = req.params.id;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push(prodId);
  // keep the user on the same page
  res.redirect("back");
}

function addproduct(req, res) {
  Category.feichAllcategory().then((cat) => {
    res.render("newproduct",{cat:cat});
  });
}

function postproduct(req, res) {
  console.log("body:", req.body);
  const { name, price, imageUrl, description, category, condition } = req.body;
  const isNew = condition === 'new';

  products
    .create({
      name,
      price,
      image: imageUrl,
      description,
      category,
      condition,
      isNew
    })
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
    const product = await products.findOne({_id:productid});
    res.render("neweditedproduct", { product: product, cat: cat });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching product");
  }
}

async function posteditproduct(req, res) {
  console.log("body:", req.body);
  const { name, price, imageUrl, description, _id, category, condition } = req.body;

  await products.updateOne({_id}, {
    name, price, image: imageUrl, description, category, condition
  }).then(() => {console.log("Product updated");})
  .catch(err => {
    console.log(err);
    res.status(500).send("Error updating product");
  });

  res.redirect("/");
}

async function getdeleteproduct(req, res) {
  const _id = req.params._id;

  try {
    const product = await products.findOne({_id});
    res.render("deleteproduct", { product: product });
  } catch (err) {
    console.log(err);
  }
}

function postdeleteproduct(req, res) {
  const _id = req.body._id;

  products.deleteOne({_id}).then(() => {
    console.log("Product deleted");
  }).catch(err => {
    console.log(err);
  });

  res.redirect("/");
}

async function getdetails(req, res) {
  const _id = req.params._id;

  const product = await products.findOne({_id});

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
  getNewProducts,
  getCategoryProducts,
  addToCart,
  addproduct,
  postproduct,
  geteditproduct,
  posteditproduct,
  getdeleteproduct,
  postdeleteproduct,
  getdetails,
  getAddCategory,
  postAddCategory
};
