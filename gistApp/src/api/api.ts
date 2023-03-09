import {Router} from 'express'
import Data from './router/Data.Router'
import {logger} from '../Logger'

export default (router: Router) => {
    logger.info('here api')

    router
        .use('/api', Data(router))
    
    return router
}