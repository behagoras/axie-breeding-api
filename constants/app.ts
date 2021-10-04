import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

export default app
