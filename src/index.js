const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv/config')

const app = express()
const server = http.createServer(app)
const io = socketio.listen(server)

//static files
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json)
app.use(express.urlencoded({extended:false}))

//db connection
mongoose.connect('mongodb://127.0.0.1:27017/db', {
    useCreateIndex:true,
    useFindAndModify:true,  
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
     console.log('DB Connection Error: ' + err);
});


require('./sockets/sockets')(io)

app.set('port', process.env.PORT || 3000)
const port = app.get('port') 
server.listen(port,()=>{
    console.log('server on port ', port)
})
