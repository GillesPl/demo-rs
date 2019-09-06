'use strict';

const express = require('express');
const ctrlApi = require('./api.controller.js');
const jwtMW = require(__base + 'server/middleware/jwt.js');


module.exports = function createRouter(app) {
  const router = new express.Router();

  router.route('/api/task2callback')
    .post(ctrlApi.task2callback);

  router.route('/api/task1callback')
    .post(ctrlApi.task1callback);

  router.route('/api/pdftest')
    .post(ctrlApi.pdfTest);

  router.route('/api/initcli')
    .post(ctrlApi.initcli);
  
  router.route('/api/getQr')
    .post(ctrlApi.getTemplateQR);

  router.route('/api/sendTask')
    .post(ctrlApi.sendTask);

  router.route('/api/addPDF')
    .post(ctrlApi.addPdf);

  router.route('/api/notify')
    .post(ctrlApi.notify);

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

  router.route('/api/validate-getphone')
    .get(ctrlApi.getValidateGetPhone);

  router.route('/api/validate-phone')
    .put(ctrlApi.putValidatePhone);

  router.route('/api/jp2tojpeg')
    .post(ctrlApi.convertJP2toJPEG);

  router.route('/api/jwt')
    .get(ctrlApi.getJwt);

  router.route('/api/version')
    .get(jwtMW.validateJWT, ctrlApi.getVersion);

  // Register our routes
  app.use(router);
};
