import {NextFunction, Request, Response} from 'express'

import {logger} from '../Logger'

function validatePolygon(req: Request, res: Response, next: NextFunction) {
  const regex: RegExp = /^\([(\d,\d)]*\)$/gm
  if (!regex.test(req.body.poly)) {
    if (process.env.LOGGER == '1')
      logger.warn('Unexpected polygon in vlidation model')
      return res.status(400).json(
          {status: false, message: 'Unexpected polygon', code: 400, data: {}})
  }

  next()
}

function validateHash(req: Request, res: Response, next: NextFunction) {
  const regex: RegExp = /^[a-f0-9]{40}$/

  if (!regex.test(req.params?.hash)) {
    if (process.env.LOGGER == '1')
      logger.warn('Unexpected hash in vlidation model')
      return res.status(400).json(
          {status: false, message: 'Unexpected hash', code: 400, data: {}})
  }

  next()
}

function validatePoint(req: Request, res: Response, next: NextFunction) {
  const regex: RegExp = /^\d$/

  if (!regex.test(req.body.pos.x) || !regex.test(req.body.pos.y)) {
    if (process.env.LOGGER == '1') logger.warn('Unexpected position pointed')
      return res.status(400).json({
        status: false,
        message: 'Unexpected position pointed',
        code: 400,
        data: {}
      })
  }

  next()
}

export {validatePolygon, validateHash, validatePoint}