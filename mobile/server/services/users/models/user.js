const { getDb } = require("../config/mongo");
const { ObjectId } = require ("mongodb");
const { hashPassword } = require("../helpers/bycriptjs");

class User {
  static users () {
    const usersCollection = getDb().collection('users')
    return usersCollection
  }

  static async findAll (){
    return await this.users().find({},{ projection: { password: 0 } }).toArray()
  }

  static async findByPk (id) {
    return await this.users().findOne({_id: new ObjectId(id)}, { projection: { password: 0 } })
   
  }

  static async delete (id) {
    const findUser = await this.findByPk(id)
      if (!findUser){
        throw ({name: "notFound", message: "User not found!"})
      }
    return await this.users().deleteOne({_id: new ObjectId(id)})
  }
  
  static async create ({ username, email, password, role, phoneNumber, address }){
    console.log(username, email, password, role, phoneNumber, address, "<< ini di models");
    if (username === ""){
      throw({name: "dataEmpty", message: "Username is required!"})
    }
    if (email === ""){
      throw({name: "dataEmpty", message: "Email is required!"})
    } else if (email !== null) {
      const emailFormat = email.split("@")
      if (emailFormat.length === 1) {
        throw ({name: "emailFormat", message: "Must be email format!"})
      }
    }
    if (password === ""){
      throw({name: "dataEmpty", message: "Password is required!"})
    } else if (password !== null){
      if  (password.length >= 1 && password.length < 5) {
        throw({name: "minValidation", message: "Minimal 5 character for password!"})
      }
      password = hashPassword(password)
    }

    const findUser = await this.users().findOne({email})
    if (findUser){
      throw ({name: "found", message: "Email must be unique!"})
    }
    
    
    return await this.users().insertOne({ username, email, password, role, phoneNumber, address })
  }

}

module.exports = User