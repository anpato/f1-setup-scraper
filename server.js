const Express = require('express')
const dependencies = require('./dependencies')
const { node_env, port } = require('./env')
const Router = require('./routes')

class Server {
  constructor(port, middleware) {
    this.port = port
    this.middleware = middleware
    this.app = Express()
  }
  initCache() {}
  initMiddleware() {
    this.middleware.forEach((m) => this.app.use(m))
  }
  initRoutes() {
    this.app.use('/api', Router)
  }
  listen() {
    this.app.listen(this.port, () =>
      console.info(`Server Started on Port: ${this.port}`)
    )
  }
  start() {
    this.initCache()
    this.initMiddleware()
    this.initRoutes()
    this.listen()
  }
}

const app = new Server(node_env === 'production' ? port : 3001, dependencies)
app.start()
