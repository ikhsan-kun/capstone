const Hapi = require('@hapi/hapi');
const authRoutes = require('./api/auth/routes');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route(authRoutes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
