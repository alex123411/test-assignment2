const express = require('express');
const router = express.Router();

const {
    filterMovies,
} = require('../services/moviesService');

router.get('/', async (req, res) => {
    try {
        const filter = req.query;
        console.log(filter)
        const result = await filterMovies(filter);
        res.status(200).json({movies: result});
        
    } catch (err) {
        res.status(err.status).json({message: err.message});
    }
});

module.exports = {
    moviesRouter: router,
}