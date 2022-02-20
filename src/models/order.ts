// @ts-ignore
import Client from "../database"

export type Order = {
  id: number | null
  userId: number
  status: string
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = "SELECT * FROM orders"

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get Order. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = "SELECT * FROM orders WHERE id=($1)"

      const result = await conn.query(sql, [id])
      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not get Order with id ${id}. Error: ${err}`)
    }
  }

  async showActiveByUser(user_id: string, status: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = "SELECT * FROM orders WHERE \"userId\"=($1) AND status=($2)"

      const result = await conn.query(sql, [user_id, status])
      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not get Order with your inputs. Error: ${err}`)
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql = "INSERT INTO orders (\"userId\", status) VALUES($1, $2) RETURNING *"
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [order.userId, order.status])

      const resultOrder = result.rows[0]

      conn.release()

      return resultOrder
    } catch (err) {
      throw new Error(`Could not add new Order for user ${order.userId}. Error: ${err}`)
    }
  }

  async addProduct(product_id: number, order_id: number, quantity: number): Promise<Order> {
    try {
      const sql = "INSERT INTO order_products (product_id,order_id,quantity) VALUES($1, $2, $3) RETURNING *"
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [product_id, order_id, quantity])

      const resultOrder = result.rows[0]

      conn.release()

      return resultOrder
    } catch (err) {
      throw new Error(`Could not add new a Product to Order. Error: ${err}`)
    }
  }

}
