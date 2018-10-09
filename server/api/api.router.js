'use strict';

const express = require('express');
const ctrlApi = require('./api.controller.js');
const jwtMW = require(__base + 'server/middleware/jwt.js');


module.exports = function createRouter(app) {
  const router = new express.Router();

  router.route('/api/dl')
    .post(ctrlApi.processDownload);

  router.route('/api/unknown-card')
    .post(ctrlApi.processUnknownCard);

  router.route('/api/sms')
    .post(ctrlApi.sms);

  router.route('/api/validate-phone')
    .post(ctrlApi.postValidatePhone);

  router.route('/api/validate-phone')
    .get(ctrlApi.getValidatePhone);

  router.route('/api/jp2tojpeg')
    .post(ctrlApi.convertJP2toJPEG);

  router.route('/api/jwt')
    .get(ctrlApi.getJwt);

  router.route('/api/version')
    .get(jwtMW.validateJWT, ctrlApi.getVersion);

  // Register our routes
  app.use(router);
};
