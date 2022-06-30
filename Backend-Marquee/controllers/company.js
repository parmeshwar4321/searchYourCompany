const knex = require("../DB/dbConfig");
const getcompany = (request, response) => {
  knex
    .select("*")
    .from("my_companies")
    .then((data) => {
      response.json({ data });
    })
    .catch((er) => {
      response.json({ message: er });
    });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  knex.query(
    "SELECT * FROM my_companies WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
const createUser = (request, response) => {
  const { cin, company_name } = request.body;
  const userdata = {};
  knex("my_companies")
    .insert({ cin, company_name })

    .then((data) => {
      response.send({ msg: "Company  added successfully" });
    })
    .catch((er) => {
      response.json({ message: er });
    });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { company_name, cin } = request.body;
  knex("my_companies")
    .where("id", "=", id)
    .update({
      cin,
      company_name,
    })
    .then((data) => {
      response.send("company updated successfully");
    })
    .catch((er) => {
      response.json({ message: er });
    });
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  knex("Users")
    .where("id", id)
    .del()
    .then((data) => {
      response.send("company deleted successfully");
    })
    .catch((er) => {
      response.json({ message: er });
    });
};

module.exports = {
  getcompany,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
