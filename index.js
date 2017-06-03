const express = require("express")
const app = express()
const mongoose = require("mongoose")

//mongodb://info:zxc123@ds141490.mlab.com:41490/react


const bodyParser = require("body-parser")
const morgan = require("morgan")
const router = require("./router")
mongoose.connect('mongodb://info:zxc123@ds141490.mlab.com:41490/react')



app.use(morgan('combined'))

app.use(bodyParser.json({type:'*/*'}))


//
router(app)



app.listen(process.env.PORT || 3090, process.env.IP, ()=>{
  console.log("Server INTIAL")
})
