const express = require('express');
const helmet = require("helmet");

const projectRouter = require("./projectRouter.js");
const actionRouter = require("./actionRouter.js");

const server = express();

//middleware
server.use(helmet());
server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

// Quick test to see if my server is working 
server.get('/', (req, res) => {
    res.send("Hello, Harjoth's API is working!"); 
 })

module.exports = server;