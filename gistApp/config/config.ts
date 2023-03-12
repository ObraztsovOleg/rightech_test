export const config = {
  database: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db_port: process.env.POSTGRES_PORT,
    db_host: 'pgsql',
    db_name: process.env.POSTGRES_DB
  },
  head: {app_http_port: process.env.APP_PORT}
}