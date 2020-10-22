import express from "express"

import * as MovieController from "../controllers/movie"

const router = express.Router()

router.post('/movie', MovieController.createMovie)
router.put('/movie/:id', MovieController.updateMovie)
router.delete('/movie/:id', MovieController.deleteMovie)
router.get('/movie/:id', MovieController.getMovieById)
router.get('/movie', MovieController.getMovies)

export default router