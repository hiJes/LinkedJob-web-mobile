const User = require("../models/user");

class Controller {
  static async showAllUser (req, res, next){
    try {
      const users = await User.findAll();
      res.status(200).json(users)
    } catch (error) {
      next(error)
      console.log(error, "<< error show all user");
    }
  }

  static async showUserById (req, res, next){
    try {
      const {id} = req.params
      const user = await User.findByPk(id)
      if (!user) {
        throw ({name: "notFound", message: "User not found!"})
      }
      res.status(200).json(user)
    } catch (error) {
      next(error)
      console.log(error, "<< error show user");
    }
  }

  static async deleteUser (req, res, next){
    try {
      const {id} = req.params
      const findUser = await User.findByPk(id)
      if (!findUser) {
        throw ( {name: "notFound", message: `User with id ${id} is not found`})
      }
      const user = await User.delete(id)
      res.status(200).json({data: findUser, message: "Delete user successfully"})
    } catch (error) {
      next(error)
      console.log(error, "<< error delete user");
    }
  }

  static async register (req, res, next){
    try {
      let { username, email, password, phoneNumber, address } =req.body
      const user = await User.create({ username, email, password, role: "admin", phoneNumber, address });

      res.status(201).json(user)
    } catch (error) {
      if (error.name === "MongoServerError"){
        next({name: "MongoServerError", message: error.errInfo.details. schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
        console.log(error.errInfo.details. schemaRulesNotSatisfied[0].propertiesNotSatisfied, "<< error register");
      } else {
        next(error)
        console.log(error, "<< error register");
      }
    }
  }
}

module.exports = Controller