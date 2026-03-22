import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

//desestruturo Pool que vem do meu pg
const { Pool } = pg;

//instancio o Pool em um variavel
export const pool = new Pool({
  //passo a string de conexão do meu .env
  connectionString: process.env.DATABASE_URL,
});

//exporto essa conecção falando que minha variavel vai receber o drizzle(e a variavel de conexão)

export const db = drizzle(pool);
