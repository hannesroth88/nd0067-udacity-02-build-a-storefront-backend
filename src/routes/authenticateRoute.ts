import express from "express"
import { UserStore } from "../models/user"
import authenticateService from "../services/authenticateService"
const userStore = new UserStore()

const authorize = async (req: express.Request, res: express.Response) => {
  /**
   *
   * Function checks for correct credentials and returns JWT Token
   *
   * @param id       : userId
   * @param password : plain Password of user with userId
   */

  try {
    const userId = req.body.id as string
    const userPassword = req.body.password as string

    // check and get User by userId
    const user = await userStore.show(userId)
    const userHashedPassword = user.password
    if (authenticateService.passwordIsCorrect(userPassword, userHashedPassword)) {
      // build JWT Token
      const jwtToken = authenticateService.getJwtToken(user)
      res.send(jwtToken)
    } else {
      res.status(401).send("not authorized: wrong credentials")
    }
  } catch (error) {
    res.status(401).send("not authorized: " + error)
  }
}

const authenticateRoutes = (app: express.Application) => {
  app.use(express.json())
  app.post("/authorize", authorize)
}

export default authenticateRoutes
