import 'reflect-metadata'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'

import api from '@core/routers/api'
import { createConnection } from '@config/db'
import errorHandling from '@core/middlewares/errorHandling.middleware'
import httpLogger from '@core/utils/httpLogger'
import Logger from '@core/utils/logger'
import config from '@config/config'

export class App {
    public app: express.Application = express()
    private port: number = +config.port || 3000

    constructor() {
        this.bootstrap()
    }

    private async bootstrap() {
        await this.typeOrmCreateConnection()
        this.setupMiddlewares()
        this.registerRouters()
        this.setUpErrorHandling()
        this.setupServer()
    }

    private setupMiddlewares() {
        this.app.use(express.json())
        this.app.use(httpLogger.successHandler)
        this.app.use(httpLogger.errorHandler)
    }

    private async typeOrmCreateConnection() {
        try {
            await createConnection.initialize()
            Logger.info('🚀 Database Started')
        } catch (error) {
            Logger.error('Caught! Cannot connect to database: ', error)
        }
    }

    private registerRouters() {
        this.app.use('/api', api)

        this.app.get('/', (req, res) => {
            res.json({
                title: 'REST API',
                mode: 'Development',
                date: new Date(),
            })
        })
    }

    private setUpErrorHandling() {
        this.app.use(errorHandling)
    }

    private setupServer() {
        this.app.listen(this.port, (): void => {
            Logger.info(`🚀 Server started at http://localhost:${this.port}\n🚨️ Environment: ${'development'}`)
        })
    }
}

export default new App()
