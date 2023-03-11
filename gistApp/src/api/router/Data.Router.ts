import {Router} from 'express'

import {validateHash, validatePoint, validatePolygon} from '../../model/validation'
import controller from '../controller/Data.Controller'

export default (router: Router) => {
  router.get('/data/:hash', validateHash, validatePoint, controller.getData)
      .post('/data', validatePolygon, controller.addData)
      .delete('/data/:hash', validateHash, controller.deleteData)
      .patch(
          '/data/:hash', validateHash, validatePolygon,
          controller.updateData)

  return router
}