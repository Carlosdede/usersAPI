import {UserController} from '../controllers/users-controller.js'
import  { FastifyInstance } from 'fastify'


const userController = new UserController()


export async function usersRoutes(app: FastifyInstance) {
    app.post('/',{
        schema:{
            body:{
                type: 'object',
                required: ['name', 'email'],
                properties: {
                    name: {type: 'string', minLength: 2},
                    email: {type: 'string', format: 'email'}
                }

            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: {type: 'string'},
                        name: {type: 'string'},
                        email: {type: 'string'}
                    }
                }
            }
        }
    }, userController.create)
    app.get('/', userController.findAll)
    app.get('/:id', userController.findById)
    app.put('/:id',{
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: {type: 'string', minLength: 2},
                    email: {type: 'string', format: 'email'}
                }
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: {type: 'string'},
                        name: {type: 'string'},
                        email: {type: 'string'}
                    }
                }
            }
        }
    }, userController.update)
    app.delete('/:id',userController.delete)

}

