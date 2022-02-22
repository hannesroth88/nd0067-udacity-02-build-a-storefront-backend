import express from "express"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import authenticateService from "../services/authenticateService"

const verifyAuthToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.headers.authorization) {
    res.status(401).send("missing authorization")
    return
  }
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(" ")[1]
    //throws error in case jwt wrong/manipulated
    authenticateService.verifyJwt(token)
    next()
  } catch (error) {
    res.status(401).send("not authorized: " + error)
    return
  }
}

export default { verifyAuthToken }
