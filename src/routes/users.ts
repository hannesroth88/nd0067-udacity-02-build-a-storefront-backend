import express, { Request, Response } from "express"
import { User, UserStore } from "../models/user"
import "dotenv/config"


const store = new UserStore()

const index = async (_req: Request, res: Response): Promise<void> => {
  const users: User[] = await store.index()
  res.json(users)
}

const show = async (_req: Request, res: Response): Promise<void> => {
  const user = await store.show(_req.body.id)
  res.json(user)
}

const create = async (_req: Request, res: Response): Promise<void> => {
  try {
    const firstName = _req.body.firstName as string
    const lastName = _req.body.lastName as string
    const password = _req.body.password as string
    const user: User = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      password: password
    }
    const userResponse = await store.create(user)
    res.json(userResponse)
  } catch (err) {
    console.log("Error Creating user: " + err)
    res.status(400)
    res.json(`Error creating user: ${err}`)
  }
}

const destroy = async (_req: Request, res: Response): Promise<void> => {
  const deleted = await store.delete(_req.body.id)
  res.json(deleted)
}


const userRoutes = (app: express.Application) => {
  app.get("/users", index)
  app.get('/users/{:id}', show)
  app.post("/users", create)
  app.delete('/users', destroy)
}

export default userRoutes
