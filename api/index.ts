import express, { Request, Response } from 'express'
import { BASE_URL } from '../constants/router.constants'
// import { getFormattedRoutes } from '../services/server.status.service'

const app = express()

app.get(`${BASE_URL}`, (_: Request, res: Response) => {
  const apisRoute = '/api/apis'
  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(`Server is running\n<br>Watcho our routes in <a href="${apisRoute}">${apisRoute}</a>`)
})

export default app
