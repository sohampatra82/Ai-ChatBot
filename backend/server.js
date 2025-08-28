require("dotenv").config();
const app = require("./src/app");

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
