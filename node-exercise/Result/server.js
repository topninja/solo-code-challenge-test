const app = require('./app');
const PORT = process.env.PORT || 8080;
require('dotenv').config();

async function startServer() {

	app.listen(PORT, () => {
		console.log(`node-exercise server started on port ${PORT}`);
	});
}

startServer();