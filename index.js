// Modules
require("dotenv").config();
const fs = require('fs');

// Files
const app = require('./src/app');
const config = require('./src/config/config');
const db = require('./src/config/db.config');

let server;
if (config.protocol == "https") {
     const https = require("https");
     server = https.createServer(
          {
               key: fs.readFileSync(config.certificate.privkey, "utf8"),
               cert: fs.readFileSync(config.certificate.fullchain, "utf8"),
          },
          app
     );
} else {
     const http = require("http");
     server = http.createServer(app);
};

server.listen(config.port, () => {
     console.log(`Server is running at ${config.port}`);
});