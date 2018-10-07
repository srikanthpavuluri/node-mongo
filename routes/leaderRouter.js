const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/(:leaderId)?')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    if (req.params.leaderId == undefined) {
        res.end('Will send all the leaders to you!');
    } else {
        res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
    }
})
.post((req,res,next) => {
    if (req.params.leaderId == undefined) {
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    } else {
        res.statusCode = 403;
        res.end('POST operation not supported on /leader/'+ req.params.leaderId);
    }
})
.put((req,res,next) => {
    if (req.params.leaderId == undefined) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    } else {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
    }
})
.delete((req,res,next) => {
    if (req.params.leaderId == undefined) {
        res.end('Deleting all leaders');
    } else {
        res.end('Deleting leader: ' + req.params.leaderId);
    }
});

module.exports = leaderRouter;