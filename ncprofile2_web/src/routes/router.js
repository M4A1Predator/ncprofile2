
import apiRouter from './api/api-router.js'
import authMiddleware from './auth-middleware.js'

export default function setAppRouter(app) {
  // routes
  app.get("/", (req, res) => {
    res.send('hello')
  })

  app.use("/api", authMiddleware, apiRouter)

  app.use((req, res) => {
    res.status(404).send("404")
  })

  app.use((err, req, res) => {
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
  })
}