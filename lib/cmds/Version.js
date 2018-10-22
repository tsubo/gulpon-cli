const { version } = require('../../package.json')

const usage = `
  gulpon version
`

class Version {
  constructor() {
    this._name = 'version'
    this._desc = 'show version'
    this._usage = usage
  }

  get name() {
    return this._name
  }
  get desc() {
    return this._desc
  }
  get usage() {
    return this._usage
  }

  exec(args) {
    console.log(`v${version}`)
  }
}

module.exports = Version
