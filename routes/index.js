const express = require('express');
const router  = express.Router();
const sendEmail = require("../utils/email-send");

/* GET home page. */
router.get('/', (req, res, next) => {
  let payload = {
    title: "Uday Singh"
  }
  console.log('Some asked for the home page');
  res.render('index', {payload: payload});
});

// Healthcheck route for Load balancer
router.get('/healthcheck', (req, res, next) => {
  console.log('Some asked for the healthchecl page');
  res.status(200);
  res.send('Healthy\n');
});

router.get('/blog', (req, res, next) => {
  let payload = {
    title: "Uday Singh"
  }
  console.log('Some asked for the blog page');
  res.render('blog', {payload: payload});
});

router.get('/contact', (req, res, next) => {
  let payload = {
    title: "Uday Singh"
  }
  console.log('Some asked for the contact page');
  res.render('contact', {payload: payload});
});

// Contact form submission
router.post("/contactMe", (req, res, next) => {
// lets first validate the inputs
  if (req.body.userName.length === 0 ||
    req.body.userEmail.length === 0 ||
    req.body.subject.length === 0 ||
    req.body.message.length === 0 
    ){
    let err = new Error('All the fields are required..!!');
    next(err);
  }

  let details = {
    name: req.body.userName,
    from: req.body.userEmail,
    subject: req.body.subject,
    message: req.body.message,
    date: new Date(),
  };

  sendEmail.sendEmails(details,req, res, next);
});

module.exports = router;