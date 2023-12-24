import express, { type Application } from 'express'
import http, { type Server } from 'http'
import routes from './routes'

class AppServer {
  private readonly server: Server
  private readonly port = 8080
  private readonly app: Application

  constructor () {
    this.app = express()
    this.server = http.createServer(this.app)
    this.middleware()
    routes(this.app)
    this.start()
  }

  private middleware (): void {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
  }

  private start (): void {
    const callback = (): void => {
      console.log('Server running at port ' + this.port)
    }
    this.server.listen(this.port, callback)
  }

  public async close (): Promise<void> {
    await new Promise<void>(resolve => {
      this.server.closeAllConnections()
      this.server.close(() => {
        resolve()
      })
    })
  }

  public getApp (): Application {
    return this.app
  }
}
const appServer = new AppServer()
export const app = appServer.getApp()
export default appServer