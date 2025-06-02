const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt"); // Tambahkan ini
const authRoutes = require("./api/auth/routes");
const feedbackRoutes = require("./api/feedback/routes");
require("dotenv").config();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["http://localhost:9000"],
        credentials: true,
      },
    },
  });

  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_SECRET,
    verify: { aud: false, iss: false, sub: false, nbf: true, exp: true, maxAgeSec: 86400 },
    validate: (artifacts, request, h) => {
      return { isValid: true, credentials: artifacts.decoded.payload };
    }
  });

  server.route(feedbackRoutes);
  server.route(authRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();