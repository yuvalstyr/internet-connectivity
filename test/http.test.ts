import { HttpTest } from "../src/classes/HttpTest"
describe("latency for http call", () => {
  test("should return latency for http://www.google.com", async () => {
    const httpTest = new HttpTest({
      protocol: "HTTP",
      url: "http://www.google.com",
      threshold: 100,
    })
    const latency = await httpTest._getHttpCallLatency()
    expect(latency).toEqual(expect.any(Number))
  }, 300000)
})
