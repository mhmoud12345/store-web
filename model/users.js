const bycrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
        role: { type: String, required: true, default: 'user' },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: { type: Number, default: 1 }
            }
        ]
    },
    image: { type: String, required: false }
});





userSchema.statics.createuser =async function(name,email,password) {
    return await bycrypt.hash(password, 10).then((hash) => {
         this.create({
            name: name,
            email: email,
            password: hash,
        });
}).then(() => {
    
    
        return User.save().then(() => {
        console.log('user saved!');
        return User;
       } ).catch((err) => {
        console.log(err);

        
    })
    }).catch((err) => {
        console.log(err);
    })


}

module.exports = mongoose.model('users', userSchema)