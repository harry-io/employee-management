const express = require("express");
const { EmployeeModel } = require("../model/employee.model");
const employeeRoute = express.Router();
//
// POST EMPLOYEE
employeeRoute.post("/employees", async (req, res) => {
  try {
    const newEmployee = new EmployeeModel(req.body);
    await newEmployee.save();
    res.status(200).send({ message: "New employee added." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// GET EMPLOYEE
employeeRoute.get("/employees", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  //
  const query = {};
  const sort = {};
  //
  if (req.query.department) {
    query.department = req.query.department;
  }
  //
  if (req.query.salary) {
    if (req.query.salary === "lth") {
      sort.salary = 1;
    } else if (req.query.salary === "htl") {
      sort.salary = -1;
    }
  }
  //
  if (req.query.firstName) {
    query.firstName = new RegExp("^" + req.query.firstName + "*");
  }

  try {
    const employees = await EmployeeModel.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.status(200).send(employees);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//

// PATCH EMPLOYEE
employeeRoute.patch("/employees/:id", async (req, res) => {
  const updated_data = req.body;
  try {
    await EmployeeModel.findByIdAndUpdate(req.params.id, updated_data);
    res.status(200).send({ message: "Employee data updated successfully." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// DELETE EMPLOYEE
employeeRoute.delete("/employees/:id", async (req, res) => {
  try {
    await EmployeeModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Employee data deleted successfully." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//   .
module.exports = { employeeRoute };
