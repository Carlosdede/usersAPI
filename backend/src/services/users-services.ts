import {eq} from 'drizzle-orm'
import { db } from 'src/db/connection.js'
import { users } from 'src/db/schema.js'


type CreateUserInput = {
    name: string,
    email: string
}
type UpdateUserInput = {
    id: string,
    name: string,
    email: string
}


export class UsersService {
    async create({name, email}: CreateUserInput) {
        const existingUser = await db.select().from(users).where(eq(users.email,email ))

        if (existingUser){
            throw new Error("E-mail já cadastrado!")
        }

        //const result = await db.select....
        //const user = result[0]
        //desconstruindo Objeto
        const [user] = await db.insert(users).values({name,email}).returning()
        return user


    }

    
}