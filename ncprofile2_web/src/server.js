import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import setAppRouter from './routes/router.js'

import init from './initializr.js'

const port = 9300
const app = express()

app.use(morgan('common'))

// Load config
init({ env: process.argv[2] })

// Express setting
app.use(helmet())
app.disable('x-powered-by')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// routes
setAppRouter(app)

// start server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})