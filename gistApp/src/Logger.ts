import winston from 'winston'

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
      winston.format.json(),
      winston.format.colorize({all: true}),
      winston.format.timestamp(),
      ),
  transports: [new winston.transports.Console()],
})

export {
  logger
}