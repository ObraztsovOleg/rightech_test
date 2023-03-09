import config from 'config'
import {Response, Request} from 'express'
import {logger} from '../../Logger'


class DataController {
  constructor() {}

  async getData(req: Request, res: Response) {
    try {
      logger.info('here controller')
      res.status(200).json({key: 'Hello'});
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

export default new DataController();