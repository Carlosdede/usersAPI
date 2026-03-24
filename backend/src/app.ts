import Fastify from "fastify";
import cors from "@fastify/cors"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import {usersRoutes} from "./routes/users-routes.js"


type Error = {
  message: string
}

export async function buildApp(){
    const app = Fastify()

    await app.register(cors, {
        origin: true, //Garante que qualquer origem consegue acessar minha API (meusite.com em produção)
    })

    await app.register(swagger, {
        openapi: {
            info: {
                title: 'Users API',
                description: 'Api de aprendizado com fastify, drizzle e postgresql',
                version: '1.0.0'
            }
        }
    })

    await app.register(swaggerUi, {
      routePrefix: "/docs",
      theme: {
        title: "Users API Docs",
        css: [
          {
            filename: "theme.css",
            content: `
          body {
            background: #0f172a;
          }

          .swagger-ui .topbar {
            background-color: #020617;
          }
        `,
          },
        ],
      },
    });



    await app.register(usersRoutes, {prefix:'/users'})

    app.setErrorHandler((error: Error, _request, reply)=>{
      console.error(error)

      return reply.status(400).send({
        message: error.message
      })
    })

    return app

}
