const movies = require('../models/movies')
const users = require('../models/user')



const movieInsert = async (req, res) => {
   
   console.log(req.body)

    try {
       

        const data = {
            'MovieName': req.body.MovieName,
            'ActorName': req.body.ActorName,
            'ProducerName': req.body.ProducerName,
            'ReleaseDate': req.body.ReleaseDate,
            'Des': req.body.Des,
            "images":req.body.images,
            "movies":req.body.movies
        }

        const movieDetails = await movies(data)
        const movieSave = await movieDetails.save()
        console.log(movieSave)

         res.status(200).json('Successfully uploaded...')
    } catch (err) {
        res.status(500).json(err + ' please try again')
    }


}


const getMovie = async (req, res) => {
    const movieData = await movies.find({})
    res.send(movieData)
}



const getMovieVideo = async (req, res) => {
    try {

        const id = req.params.id
        const find = await movies.find({ _id: id })
        console.log(find[0].movies)
        res.status(200).json(find[0])
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const deleteOneMovie = async (req, res) => {
    try {
        await movies.deleteOne({ _id: req.params.id })
        res.status(200).json('Success')
    } catch (e) {
        res.status(400).json(e + 'Please try again')

    }
}

const editOneMovie = async (req, res) => {

    try {

        await movies.updateOne({ _id: req.params.id },
            {
                $set: { MovieName: req.body.MovieName, ActorName: req.body.ActorName, ProducerName: req.body.ProducerName, Des: req.body.Des, ReleaseDate: req.body.ReleaseDate }
            })
        res.status(200).json('Successfully edited')


    } catch (e) {
        res.status(400).json(e + 'Please try again')

    }
}

const userFind = async (req, res) => {
    try {
        const users_details = await users.find()
        res.status(200).json(users_details)
    } catch (e) {
        res.status(400).json(e)

    }

}
module.exports = { movieInsert, getMovie, getMovieVideo, deleteOneMovie, userFind, editOneMovie }