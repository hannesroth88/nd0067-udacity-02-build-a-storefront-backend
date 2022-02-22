import express, { Request, Response } from "express"
import { Product, ProductStore } from "../models/product"
import "dotenv/config"
import authenticateMiddleware from "../middlewares/authenticateMiddleware"

const store = new ProductStore()

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: Product[] = await store.index()
    res.json(products)
  } catch (err) {
    console.log("Error showing all products: " + err)
    res.status(400)
    res.json(`Error showing all products: ${err}`)
  }
}

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.show(req.params.id)
    res.json(product)
  } catch (err) {
    console.log("Error showing product: " + err)
    res.status(400)
    res.json(`Error showing product: ${err}`)
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.body.name as string
    const price = req.body.price as number
    const product: Product = {
      id: null,
      name: name,
      price: price
    }

    const productResponse = await store.create(product)
    res.json(productResponse)
  } catch (err) {
    console.log("Error Creating product: " + err)
    res.status(400)
    res.json(`Error creating product: ${err}`)
  }
}

const productRoutes = (app: express.Application) => {
  app.use(express.json())
  app.get("/products", index)
  app.get("/products/:id", show)
  app.post("/products", authenticateMiddleware.verifyAuthToken, create)
}

export default productRoutes
