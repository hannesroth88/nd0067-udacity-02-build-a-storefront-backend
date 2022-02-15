/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios"
const AXIOS_OPTIONS = {
  baseURL: "http://localhost:8080"
}

describe("Main Test", () => {
  describe("Express Server Tests", () => {
    it("Image not found on server", async () => {
      expect(false).toBeFalse()
    })
  })

})
