import 'dotenv/config'
import { buildApp } from './app.js'

async function start(){
    const app = await buildApp()

    app.listen({
        port: Number(process.env.PORT),
        host: '0.0.0.0'
    })

    console.log("Server running on http://localholst:3333")
    console.log("Swagger on http://localhost:3333/docs")
}

start()