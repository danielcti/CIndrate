const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://cindrate:cindrate@cluster0-yftw2.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

app.use((req,res, next) => {
    req.io = io // pra todo mundo ter acesso ao socket.io

    next()
})

app.use(cors())

app.use(bodyParser.json());

app.use(require('./routes'))

server.listen(3333)