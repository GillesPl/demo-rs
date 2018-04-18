'use strict';

var bootstrap = require('./bootstrap');
var logger = require('@trust1team/t1t-log');
bootstrap.start(function onStart(err) {
    if (err) {
        logger.error('Error=' + err);
    }
    logger.info('app bootstrap finished');
});