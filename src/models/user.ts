// @ts-ignore
import Client from "../database"
export type User = {
  id: number | null
  firstName: string
  lastName: string
  password: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = "SELECT * FROM users"

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get user: ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = "SELECT * FROM users WHERE id=($1)"

      const result = await conn.query(sql, [id])
      const user = result.rows[0] as User

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not get user with id ${id}: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users ("firstName","lastName","password") VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [u.firstName, u.lastName, u.password])

      const book = result.rows[0]

      conn.release()

      return book
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstName} ${u.lastName}: ${err}`)
    }
  }
}
