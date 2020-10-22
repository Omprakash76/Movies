import Movie from "../models/movie";

const createMovie = (req, res) => {
    const body = req.body
    console.log('body>>>>>>>> create', body)
    if(!body){
        return req.status(400).json({
            success: false,
            error : "You Must Provide a Movie"
        })
    }

    const movie = new Movie(body)

    if(!movie){
        return res.status(400).json({success : false, error : 'err'})
    }

    movie.save().then(()=>{
        return res.status(201).json({
            success : true,
            id : movie._id,
            message : "Movie Created!"
        })
    }).catch((error)=>{
        return res.status(400).json({
            error,
            message : "Movie Not Created!"
        })
    })
}
const updateMovie = async (req, res) => {
    const body = req.body
    console.log('body>>>>>>>>update ', body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Movie.findOne({_id : req.params.id}, (err, movie)=>{
        if(err){
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        movie.name = body.name
        movie.time = body.time
        movie.rating = body.rating

        movie.save().then(()=>{
            return res.status(201).json({
                success : true,
                id : movie._id,
                message : "Movie Created!"
            })
        }).catch((error)=>{
            return res.status(400).json({
                error,
                message : "Movie Not Created!"
            })
        })
    })
}
const deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({_id : req.params.id}, (error, movie)=>{
        if(error){
            return res.status(400).json({ success: false, error: error })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movie })
    }).catch((error)=>console.log(error))
}
const getMovies = async (req, res) => {
    await Movie.find({},(err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movies) {
            return res
                .status(404)
                .json({ success: false, error: `Movies not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}
const getMovieById = async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

export {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById
}