import axios from "axios"
import { Product } from "../models/product"
import { User } from "../models/user"
const AXIOS_OPTIONS = {
  baseURL: "http://localhost:8080"
}

// needed for first authorization, is added by db-migrate up
const testUserStart = {
  id: "1",
  firstName: "Hannes",
  lastName: "Roth",
  password: "1234"
}

var jwtToken: string
var headers:any
describe("Main Test", () => {
  beforeAll(async function () {
    //we start express app here
    require("../server.js")

    const body = { id: testUserStart.id, password: testUserStart.password }
    const result = await axios.post("/authorize", body, AXIOS_OPTIONS)
    jwtToken = result.data
    console.log(`JWTToken: ${jwtToken}`)
    headers = { Authorization: `Bearer ${jwtToken}` }
  })

  describe("Server Check", () => {
    it("Check Endpoint /", async () => {
      const result = await axios.get("/", AXIOS_OPTIONS)
      expect(result.status).toBe(200)
    })
  })

  describe("Authorize & User", () => {
    const testUserNew:User = {
      id: null,
      firstName: "John",
      lastName: "Doe",
      password: "strongPassword"
    }

    it("Unauthorized - Create User /users (POST) - No JWT", async () => {
      const result = await axios.post("/users", testUserNew, {
        baseURL: AXIOS_OPTIONS.baseURL,
        validateStatus: () => true
      })

      expect(result.status).toBe(401)
    })

    var userCreated: User
    it("Create User /users (POST)", async () => {
      const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
      const result = await axios.post("/users", testUserNew, axiosConfig)
      userCreated = result.data

      expect(userCreated.firstName).toBe(testUserNew.firstName)
    })

    it("Show created User /users/:id (GET)", async () => {
      const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
      const result = await axios.get("/users/" + userCreated.id, axiosConfig)

      expect(result.data.firstName).toBe(testUserNew.firstName)
    })

    it("Show all Users /users (GET)", async () => {
      const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
      const result = await axios.get("/users", axiosConfig)
      const users = result.data as User[]

      expect(users.length > 0).toBeTrue()
    })

  })

  var productCreated: Product
  describe("Product", () => {
    const testProduct:Product = {
      id: null,
      name: "SmartMeter 2.0",
      price: 20.2
    }
    it("Create Product /products (POST)", async () => {
      const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
      const result = await axios.post("/products", testProduct, axiosConfig)
      productCreated = result.data

      expect(productCreated.name).toBe(testProduct.name)
    })

    it("Show created Product /products/:id (GET)", async () => {
      const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
      const result = await axios.get("/products/" + productCreated.id, axiosConfig)

      expect(result.data.name).toBe(productCreated.name)
    })

    it("Show all Products /products (GET)", async () => {
      const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
      const result = await axios.get("/products", axiosConfig)
      const products = result.data as Product[]

      expect(products.length > 0).toBeTrue()
    })

  })
})
