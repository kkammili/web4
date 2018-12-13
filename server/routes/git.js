const express = require('express');
const router = express.Router();

router.get('/fetchGitHubData', function (req, res) {
    res.json([{
        id:1,
        sample:'check the sample data'
    }])
})

router.get('/about', function(req, res){
    res.send("<div>html page from express</div>")
})

module.exports = router;
