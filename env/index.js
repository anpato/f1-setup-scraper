require('dotenv/config')

module.exports = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  salt_rounds: parseInt(process.env.SALT_ROUNDS) || 5,
  app_secret:
    process.env.NODE_ENV === 'production'
      ? process.env.APP_SECRET
      : 'dev_secret'
}
