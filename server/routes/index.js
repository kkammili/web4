const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.send("<h2>Welcome to express default page</h2><br><h2>Enjoy hitting api's</h2>");
});

module.exports = router;
