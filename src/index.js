require("dotenv").config();
const app = require("./app");
let port = process.env.PORT || 3002;

async function main() {
  try {
    app.listen(port);
    console.log(`server open in ${port}`);
  } catch (error) {
    throw error;
  }
}

main();
