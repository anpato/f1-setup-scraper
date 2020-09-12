module.exports = [
  require('cors')({ origin: 'http://localhost:3000' }),
  require('morgan')('dev'),
  require('compression')(),
  require('body-parser').urlencoded({ extended: true }),
  require('body-parser').json()
]
