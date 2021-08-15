import chalk from "chalk"
import { DnsLookupTest } from "../classes/DnsLookupTest"
import { HttpTest } from "../classes/HttpTest"
import { Arguments, CommandBuilder } from "yargs"
import config from "../../src/config/config.json"

type Options = {
  url: string
}

export const command: string = "runConfigFile"
export const desc: string = "Run all test in config file"

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      threshold: { type: "number" },
    })
    .positional("threshold", { type: "number", demandOption: true })

export const handler = async (argv: Arguments<Options>) => {
  const tests = config.tests
  for (const test of tests) {
    const { protocol, url, threshold } = test
    try {
      switch (protocol) {
        case "HTTP":
          const httpTest = new HttpTest({
            protocol,
            url,
            threshold: !threshold ? 0 : threshold,
          })
          await httpTest.HttpCallLatencyChecker()

          break
        case "DNS":
          const dnsTest = new DnsLookupTest({
            protocol,
            url,
          })
          await dnsTest.dnsChecker()
        default:
          break
      }
    } catch (error) {
      console.error(
        chalk.red.bold(
          `Unexpected Error occured  while trying to run ${protocol} test on ${url},
           ${error}`
        )
      )
    }
  }

  process.exit(0)
}
