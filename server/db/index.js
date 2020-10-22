import mongoose from "mongoose"

const uri = 'mongodb://127.0.0.1:27017/cinema'
mongoose.connect(uri, {useNewUrlParser : true})
    .catch(e=>{
        console.log('error in db connect', e)
    })

const db = mongoose.connection

export default db