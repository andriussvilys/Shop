import router from './routes/Products.mjs'
import express from 'express';

const app = express();
const PORT = 80;

app.use(express.json());

app.use('/products', router);

app.listen(PORT, () => {
    console.log(`\nExpress listening on PORT ${PORT}`)
})