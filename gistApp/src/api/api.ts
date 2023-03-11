import {Router} from 'express'

import Data from './router/Data.Router'

export default (router: Router) => {
  router.use('/api', Data(router))

  return router
}