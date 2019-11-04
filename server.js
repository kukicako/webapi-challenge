const express = require('express');
const helmet = require('helmet');
const actionRoute = require('./data/routes/actionRoute');
const projectRoute = require('./data/routes/projectRoute');

const server = express()

server.use(
    express.json(),
    helmet(),
)
server.use("/actions", actionRoute);
server.use("/projects", projectRoute);



server.get('/', (req,res) => {
    
    res.send({message: 'welcome to ez sprints'})
})
module.exports = server 