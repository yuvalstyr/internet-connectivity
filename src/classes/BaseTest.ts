import { ProtocolType } from "types"
import { Logger } from "./Logger"

export class BaseTest {
  url: string
  protocol: ProtocolType
  logger: Logger

  constructor({ url, protocol }: { url: string; protocol: ProtocolType }) {
    this.url = url
    this.protocol = protocol
    this.logger = new Logger()
  }
}
