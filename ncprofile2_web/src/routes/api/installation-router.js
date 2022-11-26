import express from 'express'
import ContainerFactory from '../../container.js'
import ErrorRes from '../../models/error-res.js'
import InstallError from '../../models/errors/install-error.js'
import { requireAuth } from '../auth-middleware.js'

const installationRouter = express.Router()
const container = ContainerFactory.instance()

installationRouter.get('/info', requireAuth, async (req, res, next) => {
  try {
    const webSettingService = container.WebSettingService
    const webInfo = webSettingService.getWebInfo()
    if (!webInfo) {
      res.status(404).send()
      return
    }
    res.json(webInfo)
  } catch(err) {
    next(err)
  }
  
})

installationRouter.post('/step1', async (req, res, next) => {
  try {
    // validate body
    const errorRes = new ErrorRes()
    const body = req.body
    if (!body.password || !body.password.trim()) {
      errorRes.errors.push("password is required")
      errorRes.status(400)
    }
    if (!body.webName || !body.webName.trim()) {
      errorRes.errors.push("webName is required")
    }

    if (errorRes.errors.length) {
      res.status(errorRes.status).json(errorRes.getErrorBody())
      return
    }

    // register
    const installService = container.InstallationService
    await installService.installStep1(body)
    res.json({"isInstalled": true})
  } catch(err) {
    if (err instanceof InstallError) {
      res.status(err.status).json(err.getErrorBody())
      return
    }

    next(err)
  }
})

export default installationRouter