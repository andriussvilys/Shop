import ProductsRouter from './routes/Products.mjs'
import ProductRouter from './routes/Product.mjs'
import express from 'express';

const app = express();
const PORT = 80;

app.use(express.json());

app.use('/products', ProductsRouter);
app.use('/product', ProductRouter);

app.listen(PORT, () => {
    console.log(`\nExpress listening on PORT ${PORT}`)
})


// ** INITIAL DATA
try{

    const products = db.collection('products');
    
    products.insertMany({docs: [{
        "_id": "6421b4d53fc6b68836cad77d",
        "name": "kefir",
        "price": 2.99,
        "category": "dairy"
    },
    {
        "_id": "6421b4ef3fc6b68836cad77e",
        "name": "super kefir",
        "price": 3.99,
        "category": "dairy"
    },
    {
        "_id": "6421b5033fc6b68836cad77f",
        "name": "chicken",
        "price": 3.99,
        "category": "meat"
    }]})
    .then((res, rej) => {
        response.status(200).send({data: res});
    })
    .catch( err => {console.error(err)})
}
catch(e){
    console.error(e)
}

//