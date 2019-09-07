// External Libraries
const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const cors         = require('cors');

// Internal Libraries
const populateData = require('./config/populateDatabase');

// Routes
const user_route = require('./routes/users');

// Models
const user_model = require('./models/users');

(async () => {
    try {
        let users = await user_model.find().lean();
        if(!users || !users.length) {
            await populateData();
        }
    } catch (error) {
        console.log(error);
        console.log('Error populating the database');
    }
})();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/users', user_route);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err);
	return res.status(500).send({ err });
});

module.exports = app;