import express from 'express'
import authRouter from './auth-router.js'
import installationRouter from './installation-router.js'
import cmsRouter from './cms-router.js'
import { requireAuth } from '../auth-middleware.js'

const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)

apiRouter.use('/install', installationRouter)

apiRouter.use('/cms', requireAuth, cmsRouter)

export default apiRouter