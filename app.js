const http= require('http')
const  express=require('express')
const  mongoose=require('mongoose')


const app=express();
const path = require('path');
const mainrouts=require('./router/mainrouts');
const cartrouts=require('./router/cartrouts');

app.set('view engine','ejs')
app.set('views','views')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost/cooking-web').then(()=>{console.log('db connected')}).catch((err)=>{console.log(err)})  
app.use(express.static(path.join(__dirname,'public')))


app.use(mainrouts)
app.use(cartrouts)
app.listen(3000,()=>{ console.log('port contected')})




















