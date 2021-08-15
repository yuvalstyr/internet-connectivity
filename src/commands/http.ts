import chalk from "chalk"
import { HttpTest } from "../classes/HttpTest"
import { Arguments, CommandBuilder } from "yargs"

type Options = {
  url: string
  threshold: number
}

export const command: string = "http <url>"
export const desc: string = "Get a given  <url> it http latency"

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      threshold: { type: "number" },
    })
    .positional("threshold", { type: "number", demandOption: true })

export const handler = async (argv: Arguments<Options>) => {
  const { url, threshold } = argv

  try {
    const httpTest = new HttpTest({
      protocol: "HTTP",
      url,
      threshold: !threshold ? 0 : threshold,
    })
    await httpTest.HttpCallLatencyChecker()
  } catch (error) {
    console.error(
      chalk.red.bold(
        `Unexpected Error happened when tried to do HTTP test on ${url}`
      )
    )
  }

  process.exit(0)
}
