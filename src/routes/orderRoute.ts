import express, { Request, Response } from "express"
import { Order, OrderStore } from "../models/order"
import "dotenv/config"
import authenticateMiddleware from "../middlewares/authenticateMiddleware"
import { UserStore } from "../models/user"

const store = new OrderStore()
const userStore = new UserStore()

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders: Order[] = await store.index()
    res.json(orders)
  } catch (err) {
    console.log("Error Creating order: " + err)
    res.status(400)
    res.json(`Error creating order: ${err}`)
  }
}

const show = async (req: Request, res: Response): Promise<void> => {
  const order = await store.show(req.params.id)
  res.json(order)
}

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.body.userId)
    const status = req.body.status as string
    const user = await userStore.show(userId)
    if (user) {
      const order: Order = {
        id: null,
        userId: userId,
        status: status
      }
      const orderResponse = await store.create(order)
      res.json(orderResponse)
    } else {
      console.log("Error: userId not found in Database")
      res.status(404)
      res.json(`userId:${userId} not found in Database`)
    }
  } catch (err) {
    console.log("Error Creating order: " + err)
    res.status(400)
    res.json(`Error creating order: ${err}`)
  }
}

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = parseInt(req.params.id)
    const productId = parseInt(req.body.productId)
    const quantity = parseInt(req.body.quantity)
    const orderProduct = await store.addProduct(productId, orderId, quantity)
    res.json(orderProduct)
  } catch (err) {
    console.log("Error Creating order: " + err)
    res.status(400)
    res.json(`Error creating order: ${err}`)
  }
}

const showCurrentByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id)
    const order = await store.showCurrentByUser(userId)
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      res.json(`no order found for user:${userId}`)
    }
  } catch (err) {
    console.log("Error Creating order: " + err)
    res.status(400)
    res.json(`Error creating order: ${err}`)
  }
}

const orderRoutes = (app: express.Application) => {
  app.use(express.json())
  app.get("/orders", authenticateMiddleware.verifyAuthToken, index)
  app.get("/orders/:id", authenticateMiddleware.verifyAuthToken, show)
  app.post("/orders", authenticateMiddleware.verifyAuthToken, create)
  app.post("/orders/:id/products", authenticateMiddleware.verifyAuthToken, addProduct)
  app.get("/orders/users/:id/current", authenticateMiddleware.verifyAuthToken, showCurrentByUser)
}

export default orderRoutes
