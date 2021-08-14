import { Arguments, CommandBuilder } from "yargs"
import { DnsLookupTest } from "../classes/DnsLookupTest"

type Options = {
  url: string
}

export const command: string = "dnsCheck <url>"
export const desc: string = "check if website <url> is resolving to IP"

export const builder: CommandBuilder<Options, Options> = (yargs) => yargs

export const handler = async (argv: Arguments<Options>) => {
  const { url } = argv
  const dnsTest = new DnsLookupTest({ protocol: "DNS", url })
  await dnsTest.dnsChecker()

  process.exit(0)
}
