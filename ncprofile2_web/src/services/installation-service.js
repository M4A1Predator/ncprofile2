import InstallError from '../models/errors/install-error.js'
import { FieldTypes } from '../models/field-types.js'
import UserCred from "../models/user-cred.js"
import crypto from 'crypto'
import { join, dirname } from 'path'
import { fileURLToPath } from "url"
import fs from 'fs'


export default class InstallationService {

  constructor(authService, userRepo, webInfoRepo, fieldsService) {
    this.authService = authService
    this.userRepo = userRepo
    this.webInfoRepo = webInfoRepo
    this.fieldsService = fieldsService
    
    this._saltRounds = 100
  }

  async installStep1(userCred) {

    const { password, webName } = {...userCred}

    // validate data
    const currentWebInfo = this.webInfoRepo.getWebInfo()
    if (currentWebInfo) {
      const err = new InstallError("CMS has been installed already")
      err.status = 400
      throw err
    }

    // create user
    const userAdmin = new UserCred()
    userAdmin.username = "admin"
    // hash password
    const salt = crypto.randomBytes(16).toString('hex');
    const hashPassword = crypto.pbkdf2Sync(password, salt, this._saltRounds, 64, `sha512`).toString(`hex`);
    userAdmin.password = hashPassword
    userAdmin.salt = salt

    // set basic info
    const webInfo = {
      webName
    }

    // save
    await this.userRepo.saveUser(userAdmin)
    await this.webInfoRepo.saveWebInfo(webInfo)

    // init db keys
    await this.fieldsService.initFields()
    await this._startSampleData()
  }

  async _startSampleData() {
    const field = {
      key: "NavbarItems",
      type: FieldTypes.JSON,
      data: [
        { name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "About", url: "/about" }
      ]
    }

    await this.fieldsService.addFields([field])
  }

  async _initAssetSpace() {
    // check/create folder
    const directory = join(__dirname, '../../../resource', 'assets')
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
  }

}
