const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let payload = {
    title: "Uday Singh"
  }
  res.render('index', {payload: payload});
});

router.get('/about', (req, res, next) => {
  res.render('about', {page:'About Us', menuId:'about'});
});

router.get('/contact', (req, res, next) => {
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});

module.exports = router;