
const path = require('path');
const recp = require('../model/recp');

async function feichAllrecp(req, res) {
    
        const data = await recp.feichAllrecp();
        console.log('data from db', data);
   
    res.render('main',{recipes:data});
}
module.exports = { feichAllrecp };















