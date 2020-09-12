module.exports = {
  development: {
    database: 'f1_development',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false
    }
  }
}
