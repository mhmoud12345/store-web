const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
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

const users = mongoose.model('users', userSchema)



async function createuser(name,image) {
    const User = new users({
        name: name,
        image:  image
        
    });

    
        await User.save().then(() => {
        console.log('user saved!');
        return User;
       } ).catch((err) => {
        console.log(err);
        
    })
}

function addtocart(product){

const findproduct=users.cart.items.find(cb=>{
        return product._id===cb.productId;}
)
if(findproduct){




    
}


}

module.exports =  {createuser};
