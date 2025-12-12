const mongoose = require('mongoose');
const { link } = require('../router/routs');
const recpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    }
    ,steps: {
        type: [String],
        required: true
    }
});








const Recp = mongoose.model('Recp', recpSchema)

async function feichAllrecp() {
    return Recp.find();
}






module.exports = { feichAllrecp };