const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const users = require("./routes/company");
var corsOptions = {
  Origin: "['http://localhost:3000, 'https://www.zaubacorp.com/custom-search']",
  optionsSuccessStatus: 200} // For legacy browser support
app.use(cors(corsOptions));
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
app.use("/api", users);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
