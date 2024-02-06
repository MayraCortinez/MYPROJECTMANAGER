 var express = require('express');
 var router = express.Router();

 /* GET home page. */
 router.get('/', (req, res) => {
  res.send('Bienvenido a la API del proyecto manager');
});

 module.exports = router;
