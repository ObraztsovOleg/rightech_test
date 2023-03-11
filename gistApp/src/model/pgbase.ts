import pg from 'pg'
import config from 'config'
import {logger} from '../Logger'
import { globalAgent } from 'http';

const {Pool} = pg;

export default (callback: any = null) => {
    const pool: any = new Pool({
        user: config.get('database.user'),
        password: config.get('database.password'),
        port: config.get('database.db_port'),
        database: config.get('database.db_name'),
        host: config.get('database.db_host'),
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        max: 100
    })

    const connection = {
        pool,
        query: (...args: any) => {
            return pool.connect().then((client: any) => {
                return client.query(...args).then((res: any) => {
                    logger.info(`pool processes: total - ${pool.totalCount}, \
                                idle - ${pool.idleCount}, \
                                waiting - ${pool.waitingCount}`)
                    return res.rows
                }).catch((err: any) => {
                    logger.error(`Database error - ${err}`)
                    client.release();
                }).finally(() => {
                    logger.info(`Database connection closed`)
                    client.release();
                })
            })
        }
    }

    global.pg = connection
    
    if (callback) {
        callback(connection);
    }

    return connection;
}