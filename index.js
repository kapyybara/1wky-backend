import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import compression from 'compression'
import { createServer } from 'http'
import { Server } from 'socket.io'

/* ------------------------------- add router ------------------------------- */
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import postsRoute from './routes/posts.js'
import conversationsRoute from './routes/conversations.js'
import messagesRoute from './routes/messages.js'
import searchRoute from './routes/search.js'

import websocket from './webSocket/index.js'

dotenv.config()

const __dirname = path.resolve()

const app = express()
const PORT = process.env.PORT || 3009

const server = createServer(app)
const io = new Server(server)

//? middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(
    cors({
        method: ['GET', 'POST', 'DELETE', 'PUT'],
        origin: '*',
    }),
)
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(
    compression({
        level: 6,
        threshold: 100000,
    }),
)

if (process.env.NODE_ENV === 'production') {
    //    app.use(express.static('client/build'))
    app.get('/', (req, res) => {
               res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        // res.redirect('https://tinevy.netlify.app')
    })
}

//? connect to database
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() =>
        server.listen(PORT, () => {
            console.log('Connected to MongoDB !')
            console.log(`Back sever is running at PORT:${PORT} !!`)
        }),
    )
    .catch((err) => console.log(err))

//? use routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)
app.use('/api/conversations', conversationsRoute)
app.use('/api/messages', messagesRoute)
app.use('/api/search', searchRoute)

websocket(io)
