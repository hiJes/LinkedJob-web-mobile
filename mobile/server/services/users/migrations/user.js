const { getDb, run } = require("../config/mongo")


async function createUserTable () {
  await run()
  let validate = {
      validator: {
          $jsonSchema: {
            bsonType: "object",
            title: "Users Object Validation",
            required: [ "username", "email", "password", "role", "phoneNumber", "address" ],
            properties: {
              username: {
                bsonType: "string",
                description: "Username is required!"
              },
              email:{
                bsonType: "string",
                description: "Email is required!"
              },
              password: {
                bsonType: "string",
                description: "Password is required!"
              }
            }
          }
      }
    }
    await getDb().createCollection("users", validate)
    console.log("<<< done create users table");
}

async function dropUserTable () {
  await run()
  await getDb().dropCollection('users')
  console.log("<<< done drop users table");
}


async function migration () {
  await dropUserTable()
  await createUserTable()
  process.exit()
}

migration()
