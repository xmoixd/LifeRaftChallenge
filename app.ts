import bodyParser from 'body-parser';
import express, { Application, Request, Response } from "express";
import customerRoutes from './src/routes/customer';

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/customers', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function () {
    console.log('Connected to MongoDB')
});

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Welcome to Moises Liferaft Api challenge",
        });
    }
);

try {
    app.listen(port, (): void => {
        console.log(`Server connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error.message}`);
}


/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
app.use('/api/customers', customerRoutes);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
         route: req.path,
        message: error.message
    });
});
