const { run, getDb } = require("./config/mongo");
const { hashPassword } = require("./helpers/bycriptjs");

// static async register (req, res, next){
//   try {
//     let { username, email, password, phoneNumber, address } =req.body
//     const user = await User.create({ username, email, password, role: "admin", phoneNumber, address });

//     res.status(201).json(user)
//   } catch (error) {
//     if (error.name === "MongoServerError"){
//       next({name: "MongoServerError", message: error.errInfo.details. schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
//       console.log(error.errInfo.details. schemaRulesNotSatisfied[0].propertiesNotSatisfied, "<< error show all user");
//     } else {
//       next(error)
//       console.log(error, "<< error show all user");
//     }
//   }
// }

async function seedUser () {
  await run()
  let data = require("./data/users.json")[0]
  delete data.id
  data.password = hashPassword(data.password)
  await getDb().collection('users').insertOne(data)
  
  console.log("<<< success seeding to users table");

}

async function seed () {
  await seedUser()
  process.exit()
}

seed()