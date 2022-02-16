import "dotenv/config"
import { Pool } from "pg"

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST_TEST,
  POSTGRES_PORT_TEST,
  POSTGRES_DB_TEST,
  POSTGRES_USER_TEST,
  POSTGRES_PASSWORD_TEST,
  NODE_ENV
} = process.env

let client

if (NODE_ENV == "test") {
  console.log("connecting to Test DB")

  client = new Pool({
    host: POSTGRES_HOST_TEST,
    port: parseInt(POSTGRES_PORT_TEST as string),
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER_TEST,
    password: POSTGRES_PASSWORD_TEST
  })
  console.log(`using Postgres DB: ${POSTGRES_HOST_TEST}:${POSTGRES_PORT_TEST} DB:${POSTGRES_DB_TEST}  User:${POSTGRES_USER_TEST}`)

} else if (NODE_ENV == "dev") {
  console.log("connecting to Dev DB")
  client = new Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT as string),
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })
  console.log(`using Postgres DB: ${POSTGRES_HOST}:${POSTGRES_PORT} DB:${POSTGRES_DB}  User:${POSTGRES_USER}`)
}

export default client
