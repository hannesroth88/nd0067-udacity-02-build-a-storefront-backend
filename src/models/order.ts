// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Client from "../database"

export type Order = {
  id: number | null
  userId: number
  status: string
}

export type OrderProduct = {
  id: number | null
  orderId: number
  productId: string
  quantity: number
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const conn = await Client.connect()
      const sql = "SELECT * FROM orders"

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get Order: ${err}`)
    }
  }

  async show(id: number): Promise<Order> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const conn = await Client.connect()
      const sql = "SELECT * FROM orders WHERE id=($1)"

      const result = await conn.query(sql, [id])
      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not get Order with id ${id}: ${err}`)
    }
  }

  async showCurrentByUser(userId: number): Promise<Order> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE "userId"=($1) ORDER BY id DESC LIMIT 1'

      const result = await conn.query(sql, [userId])
      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not get Order with your inputs: ${err}`)
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders ("userId", status) VALUES($1, $2) RETURNING *'
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [order.userId, order.status])

      const resultOrder = result.rows[0]
      // somehow userId comes back as string altough db is defined as bigint foreign key, db viewer shows number type.
      resultOrder.userId = parseInt(resultOrder.userId)

      conn.release()

      return resultOrder
    } catch (err) {
      throw new Error(`Could not add new Order for user ${order.userId}: ${err}`)
    }
  }

  async addProduct(productId: number, orderId: number, quantity: number): Promise<OrderProduct> {
    try {
      const sql = 'INSERT INTO order_products ("productId","orderId",quantity) VALUES($1, $2, $3) RETURNING *'
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [productId, orderId, quantity])

      const resultOrder = result.rows[0]

      // somehow userId comes back as string altough db is defined as bigint foreign key, db viewer shows number type.
      resultOrder.orderId = parseInt(resultOrder.orderId)
      resultOrder.productId = parseInt(resultOrder.productId)

      conn.release()

      return resultOrder
    } catch (err) {
      throw new Error(`Could not add new a Product to Order: ${err}`)
    }
  }
}
