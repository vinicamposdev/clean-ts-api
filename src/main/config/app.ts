import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'
import staticFiles from './static-files'

const app = express()

staticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
