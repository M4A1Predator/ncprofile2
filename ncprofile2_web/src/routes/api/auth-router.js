import express from 'express'
import ContainerFactory from '../../container.js'
import AuthError from '../../models/errors/auth-error.js'
import { requireAuth } from '../auth-middleware.js'

const authRouter = express.Router()
const container = ContainerFactory.instance()

authRouter.get('/verify', requireAuth, (req, res) => {
  res.send({ message: 'ok' })
})

authRouter.post('/token', async (req, res, next) => {
  try {
    const cred = req.body
    // validate body
    // ...

    const authService = container.AuthService
    const token = await authService.genToken(cred)
    res.json({token})
  } catch(err) {
    if (err instanceof AuthError) {
      res.status(err.status).json(err.getErrorBody())
      return
    }
    next(err)
  }
})

export default authRouter