import express, { Request, Response } from 'express'
import { BASE_URL } from '../constants/router.constants'
import { getFormattedRoutes } from '../services/server.status.service'
// import { getFormattedRoutes } from '../services/server.status.service'
import axies from './axies'
import root from './index'

const app = express()
const apps = [root, axies, app]

const apisUrl = `${BASE_URL}/apis`

app.get(`${apisUrl}`, (_: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    routes: getFormattedRoutes(apps)
  })
})

export default app
