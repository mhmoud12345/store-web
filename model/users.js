const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numberofre: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

const user = mongoose.model('users', userSchema)

async function createChefes() {
    const User = new user({
        name: 'John Doe',
        numberofre: 5444,
        image: 'johndoe.jpg',
        description: 'A skilled chef specializing in Italian cuisine.'
    });

    
        await chefes.save().then(() => {
        console.log('Chef saved!');
        return chefes;
       } ).catch((err) => {
        console.log(err);
        
    })
}

module.exports =  createChefes ;