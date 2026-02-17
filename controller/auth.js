const { name } = require("ejs");
const user = require("../model/users");
const bycrypt = require("bcrypt");

function getsignup(req, res) {
  res.render("signup");
}

function postsignup(req, res) {
  const { name, email, password } = req.body;
  user.findOne({ email: email }).then((existingUser) => {
    if (existingUser) {
      return res.redirect("/signin");
    }

    return user
      .createuser(name, email, password)
      .then((User) => {
        console.log("user saved!");
        return User;
      })
      .then(() => {
        res.redirect("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function getsignin(req, res) {
  res.render("signin");
}

function postsignin(req, res) {
  const { name, email, password } = req.body;
  user.findOne({ email: email }).then((existingUser) => {
    if (!existingUser) {
      return res.redirect("/signup");
    }
    bycrypt
      .compare(password, existingUser.password)
      .then((match) => {
        if (match) {
            const whois=existingUser.role;
          if(whois==="admin"){
              req.session.Admine = true;
          }
          else{
            if(whois==="user"){
                req.session.User = true;
            }
            }
          return res.redirect("/");
        }
        else {
         return res.redirect("/signin");
       }
      
      }).catch((err) => {
        console.log(err);
        return res.redirect("/signin");;
  });
})}


async function  logout(req, res) {
 await req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
})
    
  
}

module.exports = { getsignup, postsignup, getsignin, postsignin, logout };