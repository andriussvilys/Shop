import express from 'express'
import db from '../conn.mjs'
import {ObjectId} from 'mongodb'

const router = express.Router();
const categories = db.collection('categories');

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

    categories.find(req.query, req.params).toArray()
    .then( value => {
        res.status(200);
        res.send({data: { value }})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({"error": err.message})
    })

})

router.post('/', (req, res) => {

    categories.insertMany(req.body, req.params)

    .then( value => {
        res.status(200).send({data: { value }})
    })

    .catch( err => {
        console.error(err);
        res.status(500).send({"error": err.message})
    })

})

//update one document if filter is matched
//do not create a record if filter is not matched
router.patch('/', (req, res) => {
    categories.updateMany(req.query, {$set : req.body})

    .then( value => {

        res.status(200).send({data: value})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })
    
})

//update record, or insert new if filter is not matched
//$set - if filter matched, and recorded to be updated
//$setOnInsert - if filter not matched, and recorded to be inserted

router.put('/', (req, res) => {
    categories.updateMany(
        req.query, 
        { 
            $set : req.body, 
        }, 
        { ...req.params, upsert: true }
        )

    .then( value => {

        res.status(200).send({data: value})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })
    
})

router.delete('/', (req, res) => {

    categories.deleteMany(req.query)

    .then( value => {

        res.status(200).send({data: value})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })

})

export default router;