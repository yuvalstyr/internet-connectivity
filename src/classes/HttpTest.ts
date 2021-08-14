import chalk from "chalk"
import got from "got/dist/source"
import { BaseTest } from "./BastTest"

export class HttpTest extends BaseTest {
  async _getHttpCallLatency() {
    const url = this.url
    const resultJson = await got.get(url)
    return resultJson.timings.phases.total
  }
  async HttpCallLatencyChecker() {
    try {
      const latencyTime = this._getHttpCallLatency()
    } catch (error) {
      const { logger, protocol, url } = this
      logger.handleLogging({
        date: new Date().toISOString(),
        status: "ERROR",
        type: protocol,
        url,
        message: chalk.red.bold(
          `Unexpected error happened during ${protocol} latency test`
        ),
      })
    }
  }
}
