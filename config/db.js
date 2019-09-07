let mongoose		= require('mongoose');
mongoose.Promise 	= require('bluebird');

let conn_string = "";
switch(process.env.NODE_ENV){
    case 'PRODUCTION':
        // production connection string        
        conn_string = "mongodb://localhost:27017/dresma";
        break;
    case 'TEST':
        // test connection string
        conn_string = "mongodb://localhost:27017/dresma";
        break;
    default:
        // local connection string
        conn_string = "mongodb://localhost:27017/dresma";
}

mongoose = mongoose.createConnection(conn_string, { useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
    console.log(err || "DB - Connected - "+conn_string);
});

module.exports = mongoose;
