import express, { Request, Response } from "express"
import { User, UserStore } from "../models/user"
import "dotenv/config"
import authenticateService from "../services/authenticateService"
import authenticateMiddleware from "../middlewares/authenticateMiddleware"

const store = new UserStore()

const index = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response): Promise<void> => {
  const user = await store.show(req.params.id)
  res.json(user)
}

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const firstName = req.body.firstName as string
    const lastName = req.body.lastName as string
    const password = req.body.password as string
    const passwordHashed = authenticateService.hashPassword(password)
    const user: User = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      password: passwordHashed
    }

    const userResponse = await store.create(user)
    res.json(userResponse)
  } catch (err) {
    console.log("Error Creating user: " + err)
    res.status(400)
    res.json(`Error creating user: ${err}`)
  }
}

const userRoutes = (app: express.Application) => {
  app.use(express.json())
  app.get("/users", authenticateMiddleware.verifyAuthToken, index)
  app.get("/users/:id", authenticateMiddleware.verifyAuthToken, show)
  app.post("/users", authenticateMiddleware.verifyAuthToken, create)
}

export default userRoutes
