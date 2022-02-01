const express = require('express')
const router = express.Router()
const controllers = require('../controller/movieControlers')



router.post('/upload-of-movie-data', controllers.movieInsert)
router.get('/get-movie/:id', controllers.getMovieVideo)
router.post('/delete-movie/:id', controllers.deleteOneMovie)
router.put('/edit-movie/:id', controllers.editOneMovie)
router.get('/retrive-of-movie-data',controllers.getMovie)
router.get('/get-users', controllers.userFind)



module.exports = router