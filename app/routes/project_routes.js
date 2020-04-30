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


}