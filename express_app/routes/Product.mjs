import express from 'express'
import db from '../conn.mjs'

const router = express.Router();
const products = db.collection('products');

//req.body = data to be uploaded/downloaded
//req.query = query to fetch relevant resources
//req.params = options

router.get('/', async (req, res) => {

    products.findOne(req.query, req.params)

    .then( value => {
        res.status(200).send( { data: value } )
    })

    .catch((err) => {
        res.status(500).send(  { error: err.message });
    })

})

router.post('/', (req, res) => {

    products.insertOne(req.body)

    .then( value => {
        res.status(200).send( { data: value } );
    })

    .catch( err => {
        res.status(500).send( { error: err.message } );
    })

})

router.patch('/', (req, res) => {

    products.updateOne(req.query, {$set : req.body}, req.params)
    
    .then( value => {
        res.status(200).send( { data: value } )
    }) 

    .catch(err => {
        res.status(500).send( { error: err.message } );
    })

})

router.put('/', (req, res) => {

    products.replaceOne(req.query, req.body, {...req.params, upsert: true})

    .then( value => {

        res.status(200).send({data: value})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })
    
})

router.delete('/', (req, res) => {

    products.deleteOne(req.query)

    .then( value => {

        res.status(200).send( { data: value } )
    })

    .catch( err => {
        res.status(500).send( { error: err.message } )
    })

})

export default router;