// We’ll use the node-postgres module to create a pool of connections. Therefore, we don’t have to open and close a pool each time we make a query.
// A popular option for production pooling would be to use pgBouncer, a lightweight connection pooler for PostgreSQL.
const { Pool } = require("pg");
// // const Pool = require("pg").Pool;

// // const pool = new Pool({
// //   host: "localhost",
// //   port: 5432,
// //   user: "postgres",
// //   password: "parmya4321",
// //   database: "company",
// // });

// const pool = new Pool({
//   connectionString: "postgres://root:parmya4321@localhost:5432/company",
// });
// // pool.connect();
// const createTableText = `
// CREATE EXTENSION IF NOT EXISTS "pgcrypto";
// CREATE TEMP TABLE IF NOT EXISTS my_companies (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   cin int,
//   company_name varchar(32),
//   timestamp timestamptz
// );
// `;
// pool.query(createTableText);
// //   const newUser = {
// //     cin: "324",
// //     company_name: "brian.m.carlson@gmail.com",
// //     timestamp:new Date()
// //   };
// //   // create a new user
// //   await pool.query("INSERT INTO my_companies(cin,company_name,timestamp) VALUES($1,$2,$3)", [
// //     newUser.cin,
// //     newUser.company_name,
// //     newUser.timestamp
// //   ]);
// //   const { rows } = await pool.query("SELECT * FROM my_companies");
// //   console.log(rows);
// // }

// module.exports = { pool };
//////////////////////////////////////////////////////////

const knex = require('knex')({
  client: 'pg',
  connection:'postgres://root:parmya4321@localhost:5432/company',
  useNullAsDefault: true
});
knex.schema.createTable("my_companies", (table) => {
  table.increments('id').primary();
  table.string('cin')
  table.string('company_name')

})
  .then((data) => {
      console.log("Table Created");
  })
  .catch((err) => {
      console.log("Table Already Exist!!");
  })

module.exports = knex;