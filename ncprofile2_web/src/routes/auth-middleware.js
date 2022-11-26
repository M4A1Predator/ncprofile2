import ContainerFactory from "../container.js"
import { AUTH_HEADER } from "../helpers/constants.js"
import AppLogger from '../config/app-logger.js'

const container = ContainerFactory.instance()

export default async (req, res, next) => {
  const logger = AppLogger.getLogger()
  try {
    const authService = container.AuthService
    if (Object.keys(req.headers).indexOf(AUTH_HEADER) > -1) {
      const bearerToken = req.headers[AUTH_HEADER]
      const token = bearerToken.slice(7)
      const payload = await authService.verifyToken(token)
      if (payload) {
        req.authenticated = true
        req.authUser = payload
      } else {
        req.authenticated = false
      }
    } else{
      req.authenticated = false
    }
    next()
  } catch (err) {
    logger.error(err)
    next(err)
  }
}

export function requireAuth(req, res, next) {
  if (req.authenticated !== true) {
    res.status(401).json({ msg: "Invalid token"})
    return
  }
  next()
}
