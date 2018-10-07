const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/(:promoId)?')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    if (req.params.promoId == undefined) {
        res.end('Will send all the promotions to you!');
    } else {
        res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
    }
})
.post((req,res,next) => {
    if (req.params.promoId == undefined) {
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    } else {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotion/'+ req.params.promoId);
    }
})
.put((req,res,next) => {
    if (req.params.promoId == undefined) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    } else {
        res.write('Updating the promotion: ' + req.params.promoId + '\n');
        res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    }
})
.delete((req,res,next) => {
    if (req.params.promoId == undefined) {
        res.end('Deleting all promotions');
    } else {
        res.end('Deleting promotion: ' + req.params.promoId);
    }
});

module.exports = promotionRouter;