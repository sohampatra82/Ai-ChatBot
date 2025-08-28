const express = require("express");
const app = express();
const aiRoutes = require('./routes/ai.routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors')
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/ai',aiRoutes )
module.exports = app;

