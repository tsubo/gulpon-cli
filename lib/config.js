const Version = require('./cmds/Version')
const Init = require('./cmds/Init')

module.exports = {
  commands: [new Init(), new Version()],
  tasks: [
    {
      name: 'build',
      desc: 'build your site into public folder',
      usage: '\ngulpon build\n',
    },
    {
      name: 'serve',
      desc: 'build your site and serve local site',
      usage: '\ngulpon serve\n',
    },
    {
      name: 'clean',
      desc: 'clean public folder',
      usage: '\ngulpon clean\n',
    },
  ],
}
