import chalk from "chalk"
import got from "got/dist/source"
import { ProtocolType } from "types"
import { BaseTest } from "./BaseTest"

export class HttpTest extends BaseTest {
  threshold: number

  constructor({
    threshold,
    protocol,
    url,
  }: {
    threshold: number
    protocol: ProtocolType
    url: string
  }) {
    super({ protocol, url })
    this.threshold = threshold
  }

  async _getHttpCallLatency() {
    const url = this.url
    const resultJson = await got.get(url)
    return resultJson.timings.phases.total
  }
  async HttpCallLatencyChecker() {
    const { logger, protocol, url, threshold } = this
    try {
      const latencyTime = (await this._getHttpCallLatency()) ?? 0

      const logs = this.logger.getLogObj()
      const httpLogs = logs.filter(
        (log) => log.type === "HTTP" && log.status === "SUCCESS"
      )
      const defaultLoggerObj = {
        date: new Date().toISOString(),
        type: protocol,
        latency: latencyTime,
        url,
        message:
          `${url}- ` +
          chalk.green.bold(`latency test completed successfully `) +
          ` ,with latency of ${latencyTime}ms`,
      }
      //   case the current test is the first test of http
      if (!httpLogs.length) {
        logger.handleLogging({ ...defaultLoggerObj, status: "SUCCESS" })
        return
      }

      //   get last test of http for comparison
      const lastHttpTest = httpLogs.reduce((acc, curr) => {
        if (!acc?.date) {
          return curr
        }
        return acc.date > curr.date ? acc : curr
      }, {})

      // case threshold test
      if (latencyTime < lastHttpTest.latency + threshold) {
        logger.handleLogging({ ...defaultLoggerObj, status: "SUCCESS" })
        return
      } else {
        logger.handleLogging({
          ...defaultLoggerObj,
          status: "THRESHOLD",
          message:
            `${url}- ` +
            chalk.red.bold(`latency test failed due to threshold constraint `) +
            `threshold was ${threshold}, test latency was ${latencyTime}ms Vs. previous latency ${lastHttpTest.latency}ms `,
        })
        return
      }
    } catch (error) {
      logger.handleLogging({
        date: new Date().toISOString(),
        status: "ERROR",
        type: protocol,
        url,
        message: chalk.red.bold(error),
      })
    }
  }
}
