const Router = require("express").Router();
const {
  getUserById,
  getcompany,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/company");

Router.get("/get_all_companies", getcompany);
Router.get("/company/:id", getUserById);
Router.post("/company", createUser);
Router.put("/company/:id", updateUser);
Router.delete("/company/:id", deleteUser);

module.exports =  Router ;
