const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

const {moviesRouter} = require('./controllers/moviesController'); 

app.use(cors());

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/movies', moviesRouter);

const start = async () => {
    try {
        app.listen(8081, console.log('server startes at http://localhost:8081'));
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
}

start();
