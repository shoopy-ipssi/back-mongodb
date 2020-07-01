let ObjectId = require('mongodb').ObjectID
const bodyParser = require('body-parser')
module.exports = function (app, db) {
  app.use(bodyParser.json())
  //
  app.get('/scenario/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const details = {'scenario_id': id};
    db.collection('scenario').find(details).toArray((err, item) => {
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