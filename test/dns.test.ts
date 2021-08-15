import { DnsLookupTest } from "../src/classes/DnsLookupTest"
describe("Lookup for DNS", () => {
  test("should return true for www.google.com", async () => {
    const dnsTest = new DnsLookupTest({
      protocol: "DNS",
      url: "www.google.com",
    })
    const result = await dnsTest._dnsLookup()
    expect(result).toBe(true)
  }, 300000)
  test("should return false for google.c", async () => {
    const dnsTest = new DnsLookupTest({
      protocol: "DNS",
      url: " google.c",
    })
    const result = await dnsTest._dnsLookup()
    expect(result).toBe(false)
  }, 300000)
})
