const Hapi = require("@hapi/hapi");
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
