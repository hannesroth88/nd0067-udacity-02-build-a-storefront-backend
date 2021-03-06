// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Client from "../database"

export type Product = {
  id: number | null
  name: string
  price: number
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const conn = await Client.connect()
      const sql = "SELECT * FROM products"

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get Product: ${err}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const conn = await Client.connect()
      const sql = "SELECT * FROM products WHERE id=($1)"

      const result = await conn.query(sql, [id])
      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not get Product with id ${id}: ${err}`)
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql = "INSERT INTO products (name,price) VALUES($1, $2) RETURNING *"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [product.name, product.price])

      const resultProduct = result.rows[0]

      conn.release()

      return resultProduct
    } catch (err) {
      throw new Error(`Could not add new Product ${product.name}: ${err}`)
    }
  }
}
