import Path from "path"
import { Log } from "types"
import fs from "fs"
import chalk from "chalk"
import config from "../../src/config/config.json"

// to put the logs file in the same directory for this task i put a relative path to the  project files
const relativePath = Path.join(__dirname, `../../src/`)

export class Logger {
  logFilePath: string
  constructor() {
    this.logFilePath = Path.join(
      relativePath,
      config.logFileDir,
      config.logFileName
    )
  }

  _LogToFile(log: Log) {
    try {
      const logs = this.getLogObj()
      const StrNoColor = this._removeChalkCharacters(log.message)
      logs.push({ ...log, messageStr: StrNoColor })
      fs.writeFileSync(this.logFilePath, JSON.stringify(logs))
    } catch (err) {
      console.error(
        `log for ${log.type} was` +
          chalk.red.bold(`not saved in the log file - `) +
          err
      )
    }
  }
  _logToTerminal(message: string) {
    console.log(message)
  }

  _removeChalkCharacters(str: string): string {
    if (!str) return str
    return str.replace(/\u001b\[.*?m/g, "")
  }

  getLogObj(): any[] {
    const path = this.logFilePath
    const data = fs.readFileSync(path, "utf8")
    const logs = data ? JSON.parse(data) : []
    return logs
  }

  handleLogging(log: Log) {
    this._LogToFile(log)
    this._logToTerminal(log.message)
  }
}
