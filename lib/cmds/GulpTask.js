class GulpTask {
  constructor(task, params) {
    this._task = task
    this._name = params.name
    this._desc = params.desc
    this._usage = params.usage
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
    this._task()
  }
}

module.exports = GulpTask
