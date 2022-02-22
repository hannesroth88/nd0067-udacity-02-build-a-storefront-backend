import axios from "axios"
import { Order, OrderStore } from "../models/order"
import { Product, ProductStore } from "../models/product"
import { User, UserStore } from "../models/user"
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

let jwtToken: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let headers: any
describe("Main Test", () => {
  beforeAll(async function () {
    // set database for Server to "test". Felt it is better here, as setting the environment within package would be Os dependent
    process.env.NODE_ENV = "test"
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

    describe("Authorize & User", () => {
      const testUserNew: User = {
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

      let userCreated: User
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

      it("Get JWT token for userCreated /authorize (POST)", async () => {
        const body = { id: userCreated.id, password: testUserNew.password }
        const result = await axios.post("/authorize", body, AXIOS_OPTIONS)
        jwtToken = result.data

        expect(result.status).toBe(200)
      })
    })

    let productCreated: Product
    describe("Product", () => {
      const testProduct: Product = {
        id: null,
        name: "Radiator",
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

    let orderCreated: Order
    describe("Order", () => {
      const testOrder: Order = {
        id: null,
        userId: 1,
        status: "active"
      }
      it("Create Order /orders (POST)", async () => {
        const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
        const result = await axios.post("/orders", testOrder, axiosConfig)
        orderCreated = result.data

        expect(orderCreated.userId).toBe(testOrder.userId)
      })

      it("Show created Order /orders/:id (GET)", async () => {
        const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
        const result = await axios.get("/orders/" + orderCreated.id, axiosConfig)

        expect(result.data.id).toBe(orderCreated.id)
      })

      // orderCreated in the tests before was created by testOrder.user, thus newest order should be the id from orderCreated
      it("Get Current Order by User /orders/users/:id/current (GET)", async () => {
        const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
        const result = await axios.get(`/orders/users/${testOrder.userId}/current`, axiosConfig)

        expect(result.data.id).toBe(orderCreated.id)
      })

      it("Show all Order /orders (GET)", async () => {
        const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
        const result = await axios.get("/orders", axiosConfig)
        const orders = result.data as Order[]

        expect(orders.length > 0).toBeTrue()
      })

      it("Add Product to Order /orders/:id/products/ (POST)", async () => {
        const newProductToOrder = {
          productId: 1,
          quantity: 12
        }
        const axiosConfig = { baseURL: AXIOS_OPTIONS.baseURL, headers: headers }
        const result = await axios.post(`/orders/${orderCreated.id}/products`, newProductToOrder, axiosConfig)

        expect(result.data.orderId).toBe(orderCreated.id)
      })
    })
  })

  describe("Database Check", () => {
    describe("User", () => {
      const userStore = new UserStore()
      const testUserNew: User = {
        id: null,
        firstName: "John",
        lastName: "Doe",
        password: "strongPassword"
      }

      let userCreated: User
      it("Create User", async () => {
        userCreated = await userStore.create(testUserNew)

        expect(userCreated.firstName).toBe(testUserNew.firstName)
      })

      it("Show created User", async () => {
        const result = await userStore.show(userCreated.id as number)

        expect(result.firstName).toBe(testUserNew.firstName)
      })

      it("Index Users", async () => {
        const result = await userStore.index()
        const users = result as User[]

        expect(users.length > 0).toBeTrue()
      })
    })

    let productCreated: Product
    describe("Product", () => {
      const productStore = new ProductStore()
      const testProduct: Product = {
        id: null,
        name: "Radiator",
        price: 20.2
      }
      it("Create Product", async () => {
        productCreated = await productStore.create(testProduct)

        expect(productCreated.name).toBe(testProduct.name)
      })

      it("Show created Product", async () => {
        const result = await productStore.show(productCreated.id as number)

        expect(result.name).toBe(productCreated.name)
      })

      it("Index Products", async () => {
        const products = await productStore.index()

        expect(products.length > 0).toBeTrue()
      })
    })

    let orderCreated: Order
    describe("Order", () => {
      const orderStore = new OrderStore()
      const testOrder: Order = {
        id: null,
        userId: 1,
        status: "active"
      }

      it("Create Order", async () => {
        orderCreated = await orderStore.create(testOrder)

        expect(orderCreated.userId).toBe(testOrder.userId)
      })

      it("Show created Order", async () => {
        const result = await orderStore.show(orderCreated.id as number)

        expect(result.id).toBe(orderCreated.id)
      })

      it("Index Orders", async () => {
        const orders = await orderStore.index()

        expect(orders.length > 0).toBeTrue()
      })

      // orderCreated in the tests before was created by testOrder.user, thus newest order should be the id from orderCreated
      it("Get Current Order by User", async () => {
        const result = await orderStore.showCurrentByUser(orderCreated.userId)

        expect(result.id).toBe(orderCreated.id)
      })

      it("Add Product to Order", async () => {
        const newProductToOrder = {
          productId: 1,
          quantity: 12
        }
        const result = await orderStore.addProduct(newProductToOrder.productId, orderCreated.id as number, newProductToOrder.quantity)

        expect(result.orderId).toBe(orderCreated.id as number)
      })
    })
  })
})
