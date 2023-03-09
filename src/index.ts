import bodyParser from 'body-parser'
import config from 'config'
import express, {Express, NextFunction, Request, Response} from 'express'

import CORS from './CORS'
import {logger} from './Logger'


const app: Express = express()
const HTTP_PORT = config.get('head.app_http_port') || 4321

app.use(
       (req: Request, res: Response, next: NextFunction) =>
           res.status(200).set(CORS) && next())
    .use(express.json())
    .use(bodyParser.urlencoded({extended: true}))

try {
  app.listen(
      HTTP_PORT, () => {logger.info(`Server is running on ${HTTP_PORT}`)})
} catch (e) {
  logger.error('Server port is busy')
}