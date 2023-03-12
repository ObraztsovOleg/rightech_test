import {Request, Response} from 'express'

import {logger} from '../../Logger'
import {GetDataType, HashType, Position} from '../interface/Data.interface'

class DataController {
  constructor() {}

  async getData(req: Request, res: Response) {
    const hash: string = req.params?.hash
    const {pos}: Position = req.body

    try {
      const rows: GetDataType[] = await global.pg.query(
          `SELECT is_in_poly($1, $2)`, [hash, `(${pos.x}, ${pos.y})`])

      return res.status(200).json({
        status: true,
        message: 'Success',
        code: 200,
        data: {'is_in_poly': rows[0].is_in_poly}
      });
    } catch (error: any) {
      if (process.env.LOGGER == '1')
        logger.error(`Unexpected error in get data: ${error}`)

        return res.status(500).json({
          status: false,
          message: 'Unexpected error in get data',
          data: {},
          code: 500
        })
    }
  }

  async updateData(req: Request, res: Response) {
    const name: string = req.body?.name
    const color: string = req.body?.color
    const poly: string = req.body?.poly
    const hash: string = req.params?.hash

    try {
      await global.pg.query(
          `
        UPDATE area
        SET name = $1,
        color = $2,
        poly = $3
        WHERE hash = $4`,
          [name, color, poly, hash])

      return res.status(200).json(
          {status: true, message: 'Success', code: 200, data: {}})
    } catch (error: any) {
      if (process.env.LOGGER == '1')
        logger.error(`Unexpected error in update data: ${error}`)

        return res.status(500).json({
          status: false,
          message: 'Unexpected error in get data',
          data: {},
          code: 500
        })
    }
  }

  async addData(req: Request, res: Response) {
    const name: string = req.body?.name
    const color: string = req.body?.color
    const poly: string = req.body?.poly

    try {
      const rows: HashType[] = await global.pg.query(
          `INSERT INTO area (name, color, poly)
        VALUES($1, $2, $3)
        RETURNING hash`,
          [name, color, poly]);

      return res.status(200).json({
        status: true,
        message: 'Success',
        code: 200,
        data: {hash: rows[0]?.hash}
      });
    } catch (error: any) {
      if (process.env.LOGGER == '1')
        logger.error(`Unexpected error in add data: ${error}`)

        return res.status(500).json({
          status: false,
          message: 'Unexpected error in add data',
          data: {},
          code: 500
        })
    }
  }

  async deleteData(req: Request, res: Response) {
    const hash: string = req.params?.hash

    try {
      await global.pg.query(
          `DELETE FROM area
        WHERE hash = $1`,
          [hash]);

      res.status(200).json(
          {status: true, message: 'Success', code: 200, data: {}})
    } catch (error: any) {
      if (process.env.LOGGER == '1')
        logger.error(`Unexpected error in delete data: ${error}`)

        return res.status(500).json({
          status: false,
          message: 'Unexpected error in get data',
          data: {},
          code: 500
        })
    }
  }
}

export default new DataController();