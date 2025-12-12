const mongoose = require('mongoose');
const chefesSchema = new mongoose.Schema({
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

const Chefes = mongoose.model('Chefes', chefesSchema)

async function createChefes() {
    const chefes = new Chefes({
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

module.exports = { Chefes, createChefes };