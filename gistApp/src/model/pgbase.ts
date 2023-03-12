import pg from 'pg'

import {config} from '../../config/config'
import {logger} from '../Logger'

const {Pool} = pg;

export default (callback: any = null) => {
  const pool: any = new Pool({
    user: config.database.user,
    password: config.database.password,
    port: config.database.db_port as unknown as number,
    database: config.database.db_name,
    host: config.database.db_host,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    max: 100
  })

  const connection = {
    pool,
    query: (...args: any) => {
      return pool.connect().then(
          (client: any) => {
              return client.query(...args)
                  .then((res: any) => {
                    if (process.env.LOGGER == '1')
                      logger.info(`pool processes: total - ${pool.totalCount}, \
                                idle - ${pool.idleCount}, \
                                waiting - ${pool.waitingCount}`)
                      return res.rows
                  })
                  .catch((err: any) => {
                    if (process.env.LOGGER == '1')
                      logger.error(`Database error - ${err}`)
                      client.release()
                  })
                  .finally(() => {
                    if (process.env.LOGGER == '1')
                      logger.info(`Database connection closed`)
                      client.release()
                  })})
    }
  }

                     global.pg = connection

  if (callback) {
    callback(connection)
  }

  return connection
}