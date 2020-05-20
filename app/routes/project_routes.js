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
    app.put('/scenario/connect', (req, res) => {
        let parentChildren = "";
        let send = "";
        parentChildren = req.body;
        console.log(parentChildren)


        const detailParent = {'_id': new ObjectId(parentChildren.idParent)};
        const detailChildren = {'_id': new ObjectId(parentChildren.idChildren)};


        db.collection('scenario').updateOne(detailParent, {$push: {"childrens": new ObjectId(parentChildren.idChildren)}}, (err, item) => {
            if (err) {
                send = {'error': 'An error has occured'};
            } else {
                send = "parent good";
            }
        })
        db.collection('scenario').updateOne(detailChildren, {$push: {"parents": new ObjectId(parentChildren.idParent)}}, (err, item) => {
            if (err) {
                send = {'error': 'An error has occured'};
            } else {
                send += "\nchildren good";
            }
        })
        res.send(send)

    })
    app.put('/scenario/modify', (req, res) => {
        let send = "";
        action = req.body;
        const idAction = {'_id': new ObjectId(action.id)};
        const updateAction = {
            $set:
                {
                    "scenario_id": action.scenario_id,
                    "action": action.action,
                    "text": action.text,
                    "parents": action.parents,
                    "childrens": action.childrens
                }
        }


        db.collection('scenario').updateOne(idAction, updateAction, (err, item) => {
            if (err) {
                send = {'error': 'An error has occured'};
            } else {
                send += "Shoopy is Update";
            }
        })
        res.send(send)

    })


    app.delete('/scenario/delete/:id', (req, res) => {
        let send = "";
        actionId =  req.params.id
        const idAction = {'_id': new ObjectId(actionId)};
        const deleteParentChildren = {$pull: {parents: ObjectId(actionId), childrens: ObjectId(actionId)}};

        db.collection('scenario').update({}, deleteParentChildren, {multi: true});

        db.collection('scenario').deleteOne(idAction, (err, item) => {
            if (err) {
                send = {'error': 'An error has occured'};
            } else {
                send += "Shoopy delete action";
            }
        })
        res.send(send)

    })

}