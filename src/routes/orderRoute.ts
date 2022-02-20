import express, { Request, Response } from "express"
import { Order, OrderStore } from "../models/order"
import "dotenv/config"
import authenticateMiddleware from "../middlewares/authenticateMiddleware"

const store = new OrderStore()

const index = async (req: Request, res: Response): Promise<void> => {
  const orders: Order[] = await store.index()
  res.json(orders)
}

const show = async (req: Request, res: Response): Promise<void> => {
  const order = await store.show(req.params.id)
  res.json(order)
}

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.userId as number
    const status = req.body.status as string
    const order: Order = {
      id: null,
      userId: userId,
      status: status,
    }

    const orderResponse = await store.create(order)
    res.json(orderResponse)
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
}

export default orderRoutes
