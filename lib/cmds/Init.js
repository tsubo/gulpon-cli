const path = require('path')
const fs = require('fs-extra')
const spawn = require('cross-spawn')

const GIT_REPO_URL = 'https://github.com/tsubo/gulpon-starter.git'

const usage = `
  gulpon init <folder>
`

class Init {
  constructor() {
    this._name = 'init'
    this._desc = 'create a new gulpon project folder'
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
    if (!args._[1]) {
      console.error(usage)
      return
    }
    const target = args._[1]
    if (this._isEmptyDir(target) === false) {
      console.error(`${target} is not empty`)
      return
    }
    if (this._gitClone(target) === false) {
      console.error('git clone failed.')
      return
    }
    try {
      this._removeGitDir(target)
    } catch (err) {
      console.error(err)
      return
    }
    if (this._npmInstall(target) === false) {
      console.error('npm install failed.')
      return
    }

    console.log('\nsuccessful gulpon init.\n')
  }

  _isEmptyDir(target) {
    return !fs.existsSync(target) || fs.readdirSync(target).length === 0
  }

  _gitClone(target) {
    const result = spawn.sync(
      'git',
      ['clone', '--recursive', GIT_REPO_URL, target],
      { stdio: 'inherit' },
    )
    return result.status === 0
  }

  _removeGitDir(target) {
    const gitDir = path.resolve(target, '.git')
    fs.removeSync(gitDir)
  }

  _npmInstall(target) {
    const result = spawn.sync('npm', ['install', '--production'], {
      cwd: target,
      stdio: 'inherit',
    })
    return result.status === 0
  }
}

module.exports = Init
