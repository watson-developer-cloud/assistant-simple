const express = require('express');

module.exports = function (app) {
  const router = express.Router();

  router.get('/', function (req, res) {
    res.json({
      status: 'UP'
    });
  });

  app.use('/health', router);
};
