const express = require("express");
const nodemailer = require("nodemailer");
const voteQueries = require("../db/queries/vote");
const { createPoll, addLinks } = require("../db/queries/create_poll");
const resultQueries = require("../db/queries/results");

const router = express.Router();

// Set up nodemailer
const transporter = nodemailer.createTransport({
  service: "hotmail.com",
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASS,
  },
});

// Create new poll
router.get("/new", (req, res) => {
  res.render("create_poll");
});

router.post("/new", (req, res) => {
  const { email, title, description } = req.body;

  if (!email || !title) {
    // TODO error show message
    console.log("didn't provide data");
    return res.redirect("/polls/new");
  }
  createPoll(email, title, description)
    .then((id) =>
      addLinks(
        `http://localhost:8080/polls/${id}/results`,
        `http://localhost:8080/polls/${id}`,
        id
      )
    )
    .then((id) => res.redirect(`/options/${id}`));
});

// Poll results
router.get("/:id/results", (req, res) => {
  const id = [req.params.id];
  resultQueries.getRankings(id).then((data) => {
    const templateVars = {
      results: data,
    };

    if (data.length === 0) {
      // TODO add view
      return res.send("Nobody vote on this poll yet!");
    }

    res.render("polls_results", templateVars);
  });
});

// Vote on poll
router.get("/:id", (req, res) => {
  const id = req.params.id;

  // Get poll data from db
  voteQueries.getPollOptionInfo(id).then((data) => {
    const templateVars = {
      pollId: id,
      pollTitle: data[0]["ptitle"],
      pollDesc: data[0]["pdesc"],
      options: data,
    };

    res.render("polls_vote", templateVars);
  });
});

router.post("/:id", (req, res) => {
  const id = req.params.id;
  const voter_name = req.body.voter_name;

  // Save votes in db
  voteQueries.saveVotes(req.body);

  // Send email to poll creator
  voteQueries.getPollInfo(id).then((pollData) => {
    const admin = pollData.email;
    const title = pollData.title;
    const adminLink = pollData.admin_link;
    const voteLink = pollData.vote_link;

    const options = {
      from: process.env.OUTLOOK_USER,
      to: admin,
      subject: "Your Poll Has Received a Submission!",
      html: `
        <h3>Your poll has received a submission!</h3>

       <p>${voter_name} has voted on your poll: ${title}.</p>
       <p>Checkout the results here: <a href="${adminLink}">Results</a>.
       <p>Or send your poll to more people by using the following link: <a href="${voteLink}">Vote Link<a>.</p>

        <p>Happy decision making,<br>LHL Decision Maker Team</p>`,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent:" + info.response);
    });
  });

  res.status(200).json({ success: true });
});

module.exports = router;
