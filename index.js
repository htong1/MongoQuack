const express = require('express');
const sha1 = require("sha1");
const sendmail = require('./lib/sendMail.js');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/verifyemail/:email", (req, res) => {
  let email = req.params.email;
  console.log(email);
  sendmail(email);
  res.json({ "success": email});
})

const cors = require('cors');
const PORT = 3000;

app.use(cors());
// add routes
const router = require('./routes/router.js');
app.use('/api', router);
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
