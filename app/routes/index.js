// Router 

const noteRoutes = require('./project_routes');


module.exports = function (app, db) {
    noteRoutes(app, db);

}
