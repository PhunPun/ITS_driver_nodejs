import express from 'express';
import * as dotenv from 'dotenv';
import {
    userRouter
} from './routers/index.js';
import connect from './database/database.js';
import checkToken from './authentication/auth.js';
import cors from 'cors'

dotenv.config()
const app = express()
app.use(express.json())
app.use(checkToken)
app.use(cors());

const port = process.env.PORT || 3000

app.use('/users', userRouter)
app.get('/', (req, res) => {
    res.send('respon from drivesafe')
})

app.listen(port, '0.0.0.0' ,async() => {
    await connect()
    console.log(`listening on port : ${port}`)
})
