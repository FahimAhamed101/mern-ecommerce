import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js'
import bodyParser from "body-parser"
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected to db');
})
.catch((err)=>{
    console.log(err.message)
});



const app = express()


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:true}));
app.use('/api/users',userRouter);

app.get('/', (req, res) => {
    res.send('Server Started')
  })
app.get('/api/products',(req,res)=>{
    res.send(data.products)
});
app.get('/api/products/slug/:slug',(req,res)=>{
    const product = data.products.find((x)=> x.slug === req.params.slug);
    if(product){
       res.send(product) 
    }else{
        res.status(404).send({message:'Products Not found'})
    }
    
});

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`);
})