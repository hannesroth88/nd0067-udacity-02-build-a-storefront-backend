import express = require("express")

const app = express()

const port = 8080 // default port to listen


app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("Storefront Backend up and running")
})

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
