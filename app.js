const http= require('http')
const  express=require('express')
const  mongoose=require('mongoose')
// include a database name so documents are saved to that DB (not the default "test")
mongoose.connect('mongodb://localhost/cooking-web').then(()=>{console.log('db connected')}).catch((err)=>{console.log(err)})  

const app=express();
const routs=require('./router/routs');
const path = require('path');

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname,'public')))


















app.use(routs)
app.listen(3000,()=>{ console.log('port contected')})




















