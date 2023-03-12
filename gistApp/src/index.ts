import bodyParser from 'body-parser'
import express, {Express, NextFunction, Request, Response, Router} from 'express'

import {config} from '../config/config'

import Api from './api/api'
import CORS from './CORS'
import {logger} from './Logger'
import pool from './model/pgbase'

pool()

const app: Express = express()
const HTTP_PORT: number = config.head.app_http_port as unknown as number || 4321
const router: Router = Router();

app.use(
       (req: Request, res: Response, next: NextFunction) =>
           res.status(200).set(CORS) && next())
    .use(express.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use('/', Api(router))

try {
  app.listen(HTTP_PORT, () => {
    if (process.env.LOGGER == '1')
      logger.info(`Server is running on ${HTTP_PORT}`)
  })
} catch (error: any) {
  if (process.env.LOGGER == '1') logger.error('Server port is busy')
}