/* eslint-disable  @typescript-eslint/no-explicit-any */
import sharp from "sharp"
import imageLogic from "../components/images/imageLogic"
import imageValidation from "../components/images/imageValidation"
import axios from "axios"
const AXIOS_OPTIONS = {
  baseURL: "http://localhost:8080"
}

describe("Main Test", () => {
  describe("Image Logic Unit Tests", () => {
    it("Image not found on server", async () => {
      const data = await imageValidation.isImageFound("someimageNameNotThere")

      expect(data).toBeFalse()
    })

    it("check Image Size", async () => {
      const imageName = "encenadaport"
      const widthInput = 400
      const widthHeight = 200
      const newImage = await imageLogic.getImageCorrectSize(imageName, widthInput, widthHeight)

      await sharp(newImage)
        .metadata()
        .then(function (metadata: sharp.Metadata) {
          expect(metadata.width).toEqual(widthInput)
          return metadata.width
        })
    })
  })

  describe("Express Server", () => {
    beforeEach(function () {
      //we start express app here
      require("../index.js")
    })

    it("Check Endpoint /api/images", async () => {
      const result = await axios.get("/api/images", AXIOS_OPTIONS)

      expect(result.status).toBe(200)
    })

    it("Check /api/images: success", async () => {
      const result = await axios.get("/api/images?imageName=fjord&width=100&height=510", AXIOS_OPTIONS)

      expect(result.status).toBe(200)
    })

    it("Error /api/images: unknown imageName", async () => {
      try {
        const result = await axios.get("/api/images?imageName=someimageNameNotThere&width=100&height=510", AXIOS_OPTIONS)
        console.log(result.status)
      } catch (error: any) {
        expect(error.response.status).toBe(404)
      }
    })

    it("Error /api/images: no width & no height", async () => {
      try {
        const result = await axios.get("/api/images?imageName=fjord", AXIOS_OPTIONS)
        console.log(result.status)
      } catch (error: any) {
        expect(error.response.status).toBe(400)
      }
    })
  })
})
