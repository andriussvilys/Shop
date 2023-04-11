import express from 'express'
import db from '../conn.mjs'

const router = express.Router();
const categories = db.collection('categories');
const products = db.collection('products');

router.get('/:name/products', async (req, res) => {

    // products.find(req.query, req.params).toArray()
    const options = {}

    products.find( { category : req.params.name}, options ).toArray()

    .then( value => {
        res.status(200).send({data: [...value]})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({"error": err.message})
    })

})

router.post('/:name/products', (req, res) => {

    const options = {}

    if( Array.isArray(req.body)){

        products.insertMany({...req.body, category: req.params.name}, options)
        .then( value => {
            res.status(200).send( {data: {...value}} )
        })
    
        .catch( err => {
            console.error(err);
            res.status(500).send({"error": err.message})
        })

    }

    else{
        products.insertOne({...req.body, category: req.params.name})

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
router.patch('/:name/products', (req, res) => {

    const options = {}
    products.updateMany({...req.query, category: req.params.name}, {$set : req.body})

    .then( value => {

        res.status(200).send({data: {...value}})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })
    
})

//replace record if filter is matched
//or insert new if filter is not matched
router.put('/:name/products', (req, res) => {

    // const options = {}
    // products.updateMany(
    //         {...req.query, category : req.params.name}, 
    //         { $set : req.body, }, 
    //         { ...options, upsert: true }
    //     )

    // .then( value => {

    //     res.status(200).send({data: {...value}})

    // })

    // .catch( err => {
    //     res.status(500).send({"error": err.message})
    // })

    const options = {}

    products.find( {...req.query, category : req.params.name}, options ).toArray()
    .then( value => {

        let updateData = []

        value.forEach(item => {
            updateData.push(
                    {     
                         replaceOne: {
                            filter: { _id: item._id },
                            replacement: { ...req.body }
                        }
                    }
                )
        })

        updateData.forEach(item => console.log(item))

        products.bulkWrite(updateData)
        .then(bulkWriteResponse => {
            res.status(200).send({data: bulkWriteResponse})
        })
        .catch(bulkWriteError => {
            res.status(500).send({"error": bulkWriteError.message})
        })

    })
    .catch((err) => {
        res.status(500).send({"error": err.message})
    })
    
})

router.delete('/:name/products', (req, res) => {

    products.deleteMany({category : req.params.name})

    .then( value => {

    res.status(200).send({data: {...value}})

    })

    .catch( err => {
        res.status(500).send({"error": err.message})
    })

})

export default router;