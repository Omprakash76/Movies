import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import db from "./db/index"
import moviesRouters from "./routes/movie-router"

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, "Mongodb connection error:"))
app.get('/', (req, res)=>{
    res.send('Hello World')
})
app.use("/api", moviesRouters)
app.listen(port, ()=>{
    console.log(`app server is listening at port `, port )
})