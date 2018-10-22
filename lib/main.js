function main() {
  const Cm = require('./CmdManager')
  const minimist = require('minimist')
  const config = require('./config')

  cm = new Cm()
  registerCmd(cm, config.commands)
  registerModuleTask(cm, config.tasks)

  const args = minimist(process.argv.slice(2))
  const cmdName = parseCmdName(args)
  execCmd(cm, cmdName, args)
}

function registerCmd(cm, configCmds) {
  for (cmd of configCmds) {
    cm.register(cmd)
  }
}

function registerModuleTask(cm, configTasks) {
  const resolve = require('resolve')
  const GulpTask = require('./cmds/GulpTask')
  try {
    const modulePath = resolve.sync('gulpon', { basedir: process.cwd() })
    const gulpon = require(modulePath)

    for (taskName in gulpon) {
      const taskParams = configTasks.find(item => {
        return item.name === taskName
      })
      if (taskParams) {
        cm.register(new GulpTask(gulpon.taskName, taskParams))
      }
    }
  } catch (err) {
    // do nothing
  }
}

function parseCmdName(args) {
  let cmdName = args._[0] || 'help'
  if (args.version || args.v) {
    cmdName = 'version'
  }
  if (args.help || args.h) {
    cmdName = 'help'
  }
  return cmdName
}

function execCmd(cm, cmdName, args) {
  if (cmdName === 'help') {
    cm.help(args)
  } else {
    const cmd = cm.getCmd(cmdName)
    if (cmd) {
      cmd.exec(args)
    } else {
      console.error(`"${cmdName}" is not a valid command!`)
    }
  }
}

module.exports = main
