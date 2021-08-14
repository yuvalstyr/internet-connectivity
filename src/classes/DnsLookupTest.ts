import dns from "dns"
import chalk from "chalk"
import { BaseTest } from "./BaseTest"

export class DnsLookupTest extends BaseTest {
  _dnsLookup() {
    const url = this.url
    return new Promise((resolve) => {
      dns.lookup(url, (err) => {
        if (err && err.code === "ENOTFOUND") {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
  async dnsChecker(): Promise<boolean> {
    const logger = this.logger
    const url = this.url
    const isValid = (await this._dnsLookup()) as boolean

    const message = `${url}- ${
      Boolean(isValid)
        ? chalk.green.bold("Successfully resolved the DNS lookup")
        : chalk.red.bold("Unsuccessfully resolved the DNS lookup")
    }`

    logger.handleLogging({
      date: new Date().toISOString(),
      status: isValid ? "SUCCESS" : "FAILED",
      type: "dns",
      url,
      message,
    })
    return isValid
  }
}
