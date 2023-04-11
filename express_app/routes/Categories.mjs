import express from 'express'
import db from '../conn.mjs'
import { ObjectId } from 'mongodb';

const router = express.Router();
const categories = db.collection('categories');

//req.body = data to be uploaded/downloaded
//req.params.query = query to fetch relevant resources
//req.params.[named param] eg resources/:id -- id is the named param

// 2XX — Success
    // 201 — Created
    // 202 — Accepted
    // 204 — No Content
// 3XX — Redirection
// 4XX — Client Error
    // 400 — Bad req
    // 403 — Forbidden
    // 404 — Not Found
// 5XX — Server Error
    // 503 — Service Unavailable

router.get('/', async (req, res) => {

    // products.find(req.query, req.params).toArray()
    const options = {}

    categories.find( req.query, options ).toArray()

    .then( value => {
        res.status(200);
        res.send({data: [...value]})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({"error": err.message})
    })

})

router.post('/', (req, res) => {

    const options = {}

    if( Array.isArray(req.body)){

        categories.insertMany(req.body, options)
        .then( value => {
            res.status(200).send( {data: {...value}} )
        })
    
        .catch( err => {
            res.status(500).send({"error": err.message})
        })

    }

    else{
        categories.insertOne(req.body)

        .then( value => {
            res.status(200).send( { data: {...value} } );
        })
    
        .catch( err => {
            res.status(500).send( { error: err.message } );
        })
    }

})

//update one document if filter is matched
//do not create a record if filter is not matched
router.patch('/', (req, res) => {

    const options = {}
    categories.updateMany(req.query, {$set : req.body})

    .then( value => {

        res.status(200).send({data: {...value}})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })
    
})

//replace record if filter is matched
//or insert new if filter is not matched
router.put('/', (req, res) => {

    const options = {}
    categories.updateMany(
            req.query, 
            { $set : req.body, }, 
            { ...options, upsert: true }
        )

    .then( value => {

        res.status(200).send({data: {...value}})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })
    
})

router.delete('/', (req, res) => {

    categories.deleteMany(req.query)

    .then( value => {

    res.status(200).send({data: {...value}})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })

})

// SINGLE CATEGORY ------------------------------------------------------------

router.get('/:id', async (req, res) => {

    console.log("GET ONE")

    const query = {_id: new ObjectId(req.params.id), ...req.params.query}
    console.log(query)

    categories.findOne(query, {})
    .then( value => {
        res.status(200).send( {data : {...value}} )
    })

    .catch((err) => {
        res.status(500).send(  { error: err.message });
    })

})

router.patch('/:id', (req, res) => {

    const options = {}
    const query = {_id : new ObjectId(req.params.id), ...req.params.query}
    console.log(query)

    categories.updateOne(query, {$set : req.body}, options)
    .then( value => {
        res.status(200).send( { data: {...value} } )
    }) 

    .catch(err => {
        res.status(500).send( { error: err.message } );
    })

})

router.put('/:id', (req, res) => {

    const query = {_id : new ObjectId(req.params.id), ...req.params.query}
    console.log(query)

    categories.replaceOne(query, req.body, {upsert: true})
    .then( value => {

        res.status(200).send({data: {...value}})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })
    
})

router.delete('/:id', (req, res) => {

    const query = {_id: new ObjectId(req.params.id), ...req.params.query}
    
    categories.deleteOne(query)
    .then( value => {

        res.status(200).send( { data: {...value} } )
    })

    .catch( err => {
        res.status(500).send( { error: err.message } )
    })

})

export default router;