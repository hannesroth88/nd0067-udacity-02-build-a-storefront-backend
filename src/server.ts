import express = require("express")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")
import authenticateRoutes from "./routes/authenticateRoute"
import usersRoutes from "./routes/usersRoute"
import productRoutes from "./routes/productsRoute"
import orderRoutes from "./routes/ordersRoute"

const app = express()
const port = 8080 // default port to listen
app.use(cors())

authenticateRoutes(app)
usersRoutes(app)
productRoutes(app)
orderRoutes(app)

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("Storefront Backend up and running")
})

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
