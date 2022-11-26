
import { initConfig } from './config/config-initializer.js'
import ContainerFactory from './container.js'
import AuthService from './services/auth-service.js'
import UserRepo from './repos/user-repo.js'
import InstallationService from './services/installation-service.js'
import WebInfoRepo from './repos/web-info-repo.js'
import WebSettingService from './services/web-setting-service.js'
import FieldsRepo from './repos/fields-repo.js'
import FieldsService from './services/fields-service.js'
import FilesService from './services/files-service.js'

export default function init ({ env }) {

  const c = ContainerFactory.instance()
  initConfig({ env }).then(() => {
    // Instance repos
    c.service('UserRepo', c => new UserRepo(c.DBManager))
    c.service('WebInfoRepo', c => new WebInfoRepo(c.DBManager))
    c.service('FieldsRepo', c => new FieldsRepo(c.DBManager))

    // Instance services
    c.service('AuthService', c => new AuthService({userRepo: c.UserRepo}))
    c.service('InstallationService', c => new InstallationService(c.AuthService, c.UserRepo, c.WebInfoRepo, c.FieldsService))
    c.service('WebSettingService', c => new WebSettingService({ webInfoRepo: c.WebInfoRepo }))
    c.service('FieldsService', c => new FieldsService({ fieldsRepo: c.FieldsRepo }))
    c.service('FilesService', c => new FilesService())
  })

}
