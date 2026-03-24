import { z } from 'zod'
import { UsersService } from 'src/services/users-services.js'
import {FastifyReply, FastifyRequest} from 'fastify'



const usersServices = new UsersService()

export class UserController{
    async create(request: FastifyRequest, reply: FastifyReply){
        const bodySchema = z.object({
            name: z.string().min(2, "Nome muito curto!"),
            email: z.email('E-mail inválido')
        })

        const {name, email} = bodySchema.parse(request.body)
        const user = await usersServices.create({name, email})
        return reply.status(201).send(user)
    }

    async findAll(_request: FastifyRequest, reply:FastifyReply){
        const users = await usersServices.findAll()

        if(!users){
            return reply.status(404).send({message: "Nenhum usuário encontrado!"})
        }
        return reply.status(200).send(users)
    }

    async findById(request: FastifyRequest, reply: FastifyReply){
        const paramsSchema = z.object({
            id: z.uuid()
        })
        const {id} = paramsSchema.parse(request.params)
        const user = await usersServices.findById({id})
        if (!user){
            return reply.status(404).send({message: "Usuário não encontrado!"})
        }
        return reply.status(200).send(user)
    }
    async update(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.uuid()
        })
        const bodySchema = z.object({
            name: z.string().min(2, {message: "Nome muito curto!"}),
            email: z.email("E-mail inválido!")
        })
        const {id} = paramsSchema.parse(request.params)
        const { name, email} = bodySchema.parse(request.body)
        const user = await usersServices.update({id, name, email})
        return reply.status(200).send(user)
        
    }
    async delete(request: FastifyRequest, reply: FastifyReply){
      const paramsSchema = z.object({
        id: z.uuid()
      })


        const {id} = paramsSchema.parse(request.params)
        const user = usersServices.delete({id})
        if(!user){
            return reply.status(404).send({message: "Usuário não encontrado!"})
        }
        
        return reply.status(200).send({message: "Usuário removido com sucesso!"})

    }
}