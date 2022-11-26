import { join, dirname } from 'path'
import { fileURLToPath } from "url"
import fs from 'fs'
import ContainerFactory from '../container.js'
import DBManager from './db-manager.js'
import AppLogger from './app-logger.js'
import AppConfig from './app-config.js'

async function readConfigFile(env) {
  const logger = AppLogger.getLogger()

  const fn = `config-${env.toLowerCase()}.json`
  logger.info(`Loading ${fn}`)
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, '../../../resource', fn)
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(JSON.parse(data.toString()))
    })
  })
  
}

export const initConfig = async ({ env }) => {

  AppLogger.init()

  const config = await readConfigFile(env)
  AppConfig.init(config)

  const c = ContainerFactory.instance()
  c.service('DBManager', c => new DBManager())
  await c.DBManager.init({ env })
}

