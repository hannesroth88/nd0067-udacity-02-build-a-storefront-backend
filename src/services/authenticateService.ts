import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user"

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string)
const PEPPER = process.env.PEPPER as string

function verifyJwt(token: string) {
  jwt.verify(token, process.env.TOKEN_SECRET as string)
}

function hashPassword(passwordPlain: string): string {
  const hash = bcrypt.hashSync(passwordPlain + PEPPER, SALT_ROUNDS)
  return hash
}

function passwordIsCorrect(passwordPlain: string, passwordHash: string): boolean {
  /**
   *
   * Function checks if plainPassword corresponds to the passwordHash
   *
   */
  const isCorrect: boolean = bcrypt.compareSync(passwordPlain + PEPPER, passwordHash)
  return isCorrect
}

function getJwtToken(user: User): string {
  /**
   *
   * Function builds a JWT Token with the user model
   *
   */
  return jwt.sign({ user: user }, process.env.TOKEN_SECRET as string)
}

export default {
  verifyJwt,
  hashPassword,
  passwordIsCorrect,
  getJwtToken
}
