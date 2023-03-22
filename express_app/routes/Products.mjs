import express from 'express'
import db from '../conn.mjs'
import {ObjectId} from 'mongodb'

const router = express.Router();

router.get('/one/:id', async (req, response) => {

    let products = db.collection('products');
    products.findOne({_id: new ObjectId(req.params.id)})
    .then((res, rej) => {
        response.send({data: {"crud": "GET_by_id", res}})
    })
    .catch((err) => {
        console.error(err);
    })

})

router.get('/all', async (req, response) => {

    let products = db.collection('products');

    products.find().toArray()
    .then((res, rej) => {
        response.send({data: {"crud": "GET_all", res}})
    })
    .catch((err) => {
        console.error(err);
    })

})

router.post('/', (req, response) => {

    const products = db.collection('products');

    products.insertOne(req.body)
    .then((res, rej) => {
        response.send({data: {"crud": "POST", res}});
    })
    .catch( err => {console.error(err)})

})

router.put('/', (req, res) => {
    res.send({data: "put RESPONSE"})
})

router.delete('/', (req, res) => {
    res.send({data: "delete RESPONSE"})
})

export default router;