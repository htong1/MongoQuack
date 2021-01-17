const express = require('express');
const sha1 = require("sha1");
const sendmail = require('./lib/sendMail.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));
//sends the user a link through email  that directs the user to the sign up form.
app.get("/verifyemail/:email", (req, res) => {
  //receive email, form a link, send email with the link
  let email = req.params.email;
  console.log(email);
  sendmail(email);
  res.json({ "success": email});
})

const cors = require('cors');
// set up port
const PORT = 3000;


app.use(cors());
// add routes
const router = require('./routes/router.js');
app.use('/api', router);
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
