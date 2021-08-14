export type Log = {
  status: StatusType
  type: string
  url: string
  date: string
  message: string
  latency?: number
}

type ProtocolType = "HTTP" | "HTTPS" | "DNS"
type StatusType = "SUCCESS" | "FAILED" | "THRESHOLD" | "ERROR"

type TestConfigType = {
  protocol: ProtocolType
  url: string
  threshold?: number
}
