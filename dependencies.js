module.exports = [
  require('cors')(),
  require('morgan')('dev'),
  require('compression')(),
  require('body-parser').urlencoded({ extended: true }),
  require('body-parser').json()
]
