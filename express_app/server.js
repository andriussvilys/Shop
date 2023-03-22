import router from './routes/Products.mjs'
import express from 'express';

const app = express();
const PORT = 80;

app.use(express.json());

app.use('/products', router);

app.listen(PORT, () => {
    console.log(`\nExpress listening on PORT ${PORT}`)
})


// ** INITIAL DATA
try{

    const products = db.collection('products');
    
    products.insertOne({"name": "kefir", "price": 2.99, "category": "dairy"})
    .then((res, rej) => {
        response.send({data: {"crud": "POST", res}});
    })
    .catch( err => {console.error(err)})
}
catch(e){
    console.error(e)
}

//