const http= require('http')
require("dotenv").config();
const helmet = require('helmet');
const  express=require('express')
const  mongoose=require('mongoose')
const compression = require('compression');

const app=express();
const path = require('path');
const mainrouts=require('./router/mainrouts');
const cartrouts=require('./router/cartrouts');

app.set('view engine','ejs')
app.set('views','views')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());
// mongoose.connect('mongodb://localhost/cooking-web').then(()=>{console.log('db connected')}).catch((err)=>{console.log(err)})  
mongoose.connect(process.env.MONGO_URI).then(() => {console.log('db connected')}).catch((err) => {console.log(err)})
app.use(express.static(path.join(__dirname,'public')))


app.use(mainrouts)
app.use(cartrouts)

// Global error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});















