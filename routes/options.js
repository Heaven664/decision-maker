const express = require('express');
const nodemailer = require('nodemailer');
const { getPoll } = require('../db/queries/get_poll');
const { deleteOption } = require('../db/queries/delete_option');
const { insertOption, getOptions } = require('../db/queries/create_option');

const router = express.Router();

// Set up nodemailer
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASS
  }
});

// Add options to a poll
router.get('/:id', (req, res) => {
  const pollId = req.params.id;

  getOptions(pollId)
    .then(options => {
      if (!options) {
        return res.send('poll does not exist')
      }
      const templateVars = {options, pollId}
      res.render('add_options.ejs', templateVars)
    });
});

// Post single option
router.post('/', (req, res) => {
  if (!req.body.title) {
    // TODO show error message
    return console.log('not ok');
  }

  const title = req.body.title;
  const description = (!req.body.description) ? null : req.body.description;
  const pollId = req.body.pollId;

  insertOption(pollId, title, description)
    .then(option => res.json(option));
});

// Complete poll and send email
router.post('/:id', (req, res) => {
  const id = req.params.id;
  getPoll(id)
    .then(poll => {
      const options = {
        from: process.env.OUTLOOK_USER,
        to: `${poll.email}`,
        subject: 'Poll links',
        html: `
        <p>These are your poll links:<p>
        <p>You can share this voter link: </p><a href="http://localhost:8080/polls/${poll.id}">http://localhost:8080/polls/${poll.id}</a>
        <p>You can see current results of the poll here: </p><a href="http://localhost:8080/polls/${poll.id}/results">Results</a>
        `
      };
      transporter.sendMail(options, (err, info) => {
        if (err) {
          return console.log(err);
        }
        console.log(info.response);
        res.status(200).json(poll.email);
      });
    });

});

// Delete a poll option
router.post('/delete/:id', (req, res) => {
  const optionId = req.params.id;

  deleteOption([optionId])
    .then(() => res.status(200).json({ success: true }))
});

module.exports = router;
