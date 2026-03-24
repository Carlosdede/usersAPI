import { eq } from "drizzle-orm";
import { db } from "src/db/connection.js";
import { users } from "src/db/schema.js";

type CreateUserInput = {
  name: string;
  email: string;
};
type UpdateUserInput = {
  id: string;
  name: string;
  email: string;
};

type DeleteUserInput = {
  id: string;
};

export class UsersService {
  async create({ name, email }: CreateUserInput) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      throw new Error("E-mail já cadastrado!");
    }

    //const result = await db.select....
    //const user = result[0]
    //desconstruindo Objeto
    const [user] = await db.insert(users).values({ name, email }).returning();
    return user;
  }
  async listar() {
    const listUser = await db.select().from(users);
    return listUser;
  }
  async update({ id, name, email }: UpdateUserInput) {
    const existingUser = await db.select().from(users).where(eq(users.id, id));
    if (existingUser.length === 0) {
      throw new Error("Usuário não encontrado!");
    }
    const [user] = await db
      .update(users)
      .set({ name, email })
      .where(eq(users.id, id))
      .returning();

    return user;
  }
  async delete({ id }: DeleteUserInput) {
    const existingUser = await db.select().from(users).where(eq(users.id, id));
    if (existingUser.length === 0) {
      throw new Error("Usuário não encontrado!");
    }

    const [user] = await db.delete(users).where(eq(users.id, id)).returning();

    return user;
  }
}
