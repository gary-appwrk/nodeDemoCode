const env = process.env;

const config = {
    host: env.hostname || 'localhost',
    username: env.username || 'roots',
    password: env.password || 'roots',
    database: env.dbName || 'trans',
    dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};

module.exports = config;