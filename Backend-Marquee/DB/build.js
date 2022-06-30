const fs = require("fs");
const path = require("path");
const {pool} = require("./dbConfig");

// get the contents of our init.sql file
const initPath = path.join(__dirname, "init.sql");
const initSQL = fs.readFileSync(initPath, "utf-8");

function build() {
  return pool
    .query(initSQL)
    .then(() => {
      console.log("Database built");
    //   pool.end(); // close the connection as we're finished
    })
    .catch(console.log);
}

// this will only run if this file is executed directly
// e.g. run `node solution/database/build.js` in your terminal
// https://nodejs.org/api/modules.html#modules_accessing_the_main_module
// this allows us to use this to rebuild our DB easily
if (require.main === module) {
  build().then(() => pool.end());
}

module.exports = build;
