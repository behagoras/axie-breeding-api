import bodyParser from 'body-parser'
import express from 'express'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

export default app
