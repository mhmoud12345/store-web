const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cart: {
        items:[
            {
 _id:{
type: mongoose.Types.ObjectId,
ref: 'products'

 }
,
quantity:Number
            }
        ]
        
    },
    image: {
        type: String,
        required: false
    }
   
});

const users = mongoose.model('users', userSchema)



async function createuser() {
    const User = new user({
        name: 'John Doe',
        numberofre: 5444,
        image: 'johndoe.jpg',
        description: 'A skilled chef specializing in Italian cuisine.'

        
    });

    
        await users.save().then(() => {
        console.log('Chef saved!');
        return chefes;
       } ).catch((err) => {
        console.log(err);
        
    })
}

module.exports =  createChefes ;
