import express from 'express'
import ContainerFactory from '../../container.js'
import AddFieldError from '../../models/errors/add-field-error.js'
import { defaultStorage, defaultUploadLimits } from '../../helpers/uploader-util.js'
import multer from 'multer'

const cmsRouter = express.Router()
const container = ContainerFactory.instance()

const uploader = multer({ storage: defaultStorage, limits: defaultUploadLimits })

cmsRouter.get('/fields', async (req, res) => {
  const fieldsService = container.FieldsService
  const fields = fieldsService.getFields()
  res.json({
    fields
  })
})

cmsRouter.post('/fields', async (req, res, next) => {
  try {
    const fieldsService = container.FieldsService
    await fieldsService.addFields(req.body)
    
    // add field
    res.status(200).json({ message: 'success' })
  } catch(err) {
    if (err instanceof AddFieldError) {
      res.status(err.status).json(err.getErrorBody())
      return;
    }
    next(err)
  }
})

cmsRouter.post('/file', uploader.single('file'), async (req, res, next) => {
  try {
    res.json({ message: `Uploaded file ${req.file.originalname}` })
  } catch(err) {
    next(err)
  }
})

cmsRouter.get('/files', async (req, res, next) => {
  try {
    const filesService = container.FilesService
    const result = await filesService.getFiles()
    res.json(result)
  } catch(err) {
    next(err)
  }
})

export default cmsRouter
