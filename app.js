const http= require('http')
const  express=require('express')
const  mongoose=require('mongoose')


const app=express();
const routs=require('./router/routs');
const path = require('path');

app.set('view engine','ejs')
app.set('views','views')
// parse URL-encoded bodies (for form POSTs)
app.use(express.urlencoded({ extended: true }));
// optionally parse JSON bodies
app.use(express.json());

mongoose.connect('mongodb://localhost/cooking-web').then(()=>{console.log('db connected')}).catch((err)=>{console.log(err)})  
app.use(express.static(path.join(__dirname,'public')))


















app.use(routs)
app.listen(3000,()=>{ console.log('port contected')})




















