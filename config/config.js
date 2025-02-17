module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'ac_twitter_workspace',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'ac_twitter_workspace_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  travis: {
    username: 'travis',
    database: 'ac_twitter_workspace_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  }
}
