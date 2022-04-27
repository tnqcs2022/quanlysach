const config = {
	app: {
		port: process.env.PORT || 3000,
	},
	db: {
		uri: process.env.MONGODB_URI || "mongodb://localhost:27017/bookapp",
	},
	jwt: {
		secret: process.env.JWT_SECRET || "bookapp-secret-key",
	},
};

module.exports = config;
