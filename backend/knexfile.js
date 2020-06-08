module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "devfinder",
      socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`,
    },
  },
};
