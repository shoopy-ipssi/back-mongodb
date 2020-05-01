let ObjectId = require('mongodb').ObjectID
const bodyParser = require('body-parser')
module.exports = function (app, db) {
    app.use(bodyParser.json())
    //
    app.get('/scenario/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id': new ObjectId(id)};
        db.collection('scenario').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(item)
            }
        })
    })
    app.get('/scenario', (req, res) => {
        db.collection('scenario').find().toArray((err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(item)
            }
        })
    })
    app.post('/scenario/add', (req, res) => {


        let newScenar = "";
        newScenar = req.body;
        console.log(newScenar)

        db.collection('scenario').insertOne(newScenar, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(item.insertedId)
            }
        })
    })
    app.patch('/scenario/connect', (req, res) => {
        let parentChildren = "";
        parentChildren = req.body;
        console.log(parentChildren)


        const detailParent = {'_id': new ObjectId(parentChildren.idParent)};
        const detailChildren = {'_id': new ObjectId(parentChildren.idChildren)};


        db.collection('scenario').updateOne(detailParent, {$push: {"childrens": new ObjectId(parentChildren.idChildren)}}, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            }
        })
        db.collection('scenario').updateOne(detailChildren, {$push: {"parents": new ObjectId(parentChildren.idParent)}}, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send("Parents and Children good")
            }
        })


    })


}