const printf = require('printf')

const usage = `
Usage:
  gulpon command [options] [arguments]

Options:
  -h, --help     show help
  -v, --version  show version

Commands:`

class CmdManager {
  constructor() {
    this._cmds = {}
  }

  register(cmd) {
    this._cmds[cmd.name] = cmd
  }

  getCmd(name) {
    return this._cmds[name]
  }

  help(args) {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
    const cmd = this.getCmd(subCmd)
    if (cmd) {
      console.log(cmd.usage)
    } else {
      console.log(usage)
      let keys = Object.keys(this._cmds)
      keys.sort()
      for (const key of keys) {
        const cmd = this._cmds[key]
        console.log(printf('  %-8s %s', cmd.name, cmd.desc))
      }
      console.log('')
    }
  }
}

module.exports = CmdManager
