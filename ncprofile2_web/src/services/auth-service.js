import AppLogger from "../config/app-logger.js"
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from "url"
import crypto from 'crypto'
import AuthError from "../models/errors/auth-error.js"

export default class AuthService {
  constructor({userRepo}) {
    this._logger = AppLogger.getLogger()
    this.userRepo = userRepo
  }

  _readPrivateKey() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const privateKeyFile = join(__dirname, '../../../key', "test2")
    return new Promise((resolve) => {
      fs.readFile(privateKeyFile, "utf-8", (err, data) => {
        resolve(data)
      });
    })

  }

  _readPublicKey() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const privateKeyFile = join(__dirname, '../../../key', "test2pub.pem")
    return new Promise((resolve) => {
      fs.readFile(privateKeyFile, "utf-8", (err, data) => {
        resolve(data)
      });
    })
  }

  async genToken(user) {

    // verify user
    const adminUser = this.userRepo.getAdmin()
    const hash = crypto.pbkdf2Sync(user.password, adminUser.salt, 100, 64, `sha512`).toString(`hex`);
    const isPasswordVerified = hash === adminUser.password
    if (!isPasswordVerified || adminUser.username !== user.username) {
      throw new AuthError("Invalid username or password")
    }

    const privateKey = await this._readPrivateKey()
    const token = jwt.sign({"name":"admin"}, privateKey, { algorithm: 'RS256', expiresIn: "7d"})
    this._logger.info(`Generated token for ${user.username}`)
    return token
  }

  async verifyToken(token) {
    try {
      const publicKey = await this._readPublicKey()
      const payload = jwt.verify(token, publicKey)
      return payload
    } catch(err) {
      if (err.constructor.name === 'JsonWebTokenError') {
        return undefined
      }
      this._logger.error(err.message)
      return undefined
    }
  }
  
}