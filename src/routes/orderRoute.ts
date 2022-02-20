import express, { Request, Response } from "express"
import { OrderDb, OrderStore } from "../models/order"
import "dotenv/config"
import authenticateMiddleware from "../middlewares/authenticateMiddleware"
import { UserStore } from "../models/user"

const store = new OrderStore()
const userStore = new UserStore()

const index = async (req: Request, res: Response): Promise<void> => {
  const orders: OrderDb[] = await store.index()
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
    const user = await userStore.show(userId)
    if (user) {
      const order: OrderDb = {
        id: null,
        userId: userId,
        status: status,
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

const orderRoutes = (app: express.Application) => {
  app.use(express.json())
  app.get("/orders", authenticateMiddleware.verifyAuthToken, index)
  app.get("/orders/:id", authenticateMiddleware.verifyAuthToken, show)
  app.post("/orders", authenticateMiddleware.verifyAuthToken, create)
}

export default orderRoutes
