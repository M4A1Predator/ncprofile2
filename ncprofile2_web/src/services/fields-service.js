import jsonschema from 'jsonschema'
import AppConfig from "../config/app-config.js"
import AppLogger from '../config/app-logger.js'
import AddFieldError from '../models/errors/add-field-error.js'
import { FieldTypes } from "../models/field-types.js"
import { fieldSchema } from "../models/field.js"

export default class FieldsService {

  constructor({ fieldsRepo }) {
    this._logger = AppLogger.getLogger()
    this.fieldsRepo = fieldsRepo

    this._fieldValidator = new jsonschema.Validator()
    this._fieldValidator.customFormats.fieldTypeFormat = (input) => {
      return [FieldTypes.HTML, FieldTypes.JSON, FieldTypes.TEXT].indexOf(input) > -1
    }
  }

  initFields() {
    this.fieldsRepo.initFieldsDB()
  }

  async addFields(fields, upsertEnabled=true) {
    this._logger.info(`Adding field ${JSON.stringify(fields)}`)
    // get config
    const needSerializeJSON = AppConfig.instance().getConfig('strigifyFieldJSON')

    // validate schema
    const validateErrors = this._validateFieldsSchema(fields)
    if (validateErrors && validateErrors.length) {
      this._logger.error(`Validation error ${validateErrors}`)
      throw new AddFieldError(validateErrors)
    }

    // serialize
    const serializedFields = []
    fields.forEach(f => {
      const sf = Object.assign({}, f)
      if (sf.type === FieldTypes.JSON) {
        if (needSerializeJSON === true){
          sf.data = JSON.stringify(f.data)
        }
      }
      serializedFields.push(sf)
    })

    // insert or update field
    const existedFields = await this.fieldsRepo.getFields()
    for (let i=0;i<serializedFields.length;i++) {
      const sf = serializedFields[i]
      const existedIndex = existedFields.findIndex(ef => sf.name === ef.name)
      if (existedIndex > -1) {
        if (upsertEnabled === false) {
          throw new AddFieldError(`Duplicated field : ${sf.name}`)
        }
        existedFields[existedIndex] = sf
      } else {
        existedFields.push(sf)
      }
    }
    await this.fieldsRepo.upsertFields(existedFields)
  }

  getFields() {
    return this.fieldsRepo.getFields()
  }

  _validateFieldsSchema(fields) {
    const errors = []
    fields.forEach(f => {
      const result = this._fieldValidator.validate(f, fieldSchema)
      if (result.errors && result.errors.length) {
        const errMsg = result.errors.map(err => err.message).join(', ')
        errors.push(errMsg)
      }
    })
    return errors
  }

}
