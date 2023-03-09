import {Router} from 'express'
import controller from '../controller/Data.Controller'
import {logger} from '../../Logger'

export default (router: Router) => {
    logger.info('here router')
    router
        .get('/data', controller.getData)
    
    return router
}