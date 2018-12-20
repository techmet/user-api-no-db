// Import packages
const express = require('express')
const morgan = require('morgan')
// App
const app = express()
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const cors = require('cors');

const allowedOrigins = ['http://localhost:4200'];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
// Morgan
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require('./routes/index.routes'))
// First route
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    })
})
// Starting server
app.listen('1337')