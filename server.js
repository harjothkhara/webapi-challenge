const express = require("express");
const helmet = require("helmet");
const projectRouter = require("./projectRouter.js");
const actionRouter = require("./actionRouter.js");

const server = express();

//middleware
server.use(helemt());
server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;