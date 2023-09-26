const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://gitaadj97:WMeZC87Sk4YnVrcZ@mydata.sqn0lzg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = 'c2_p3_linkedjob'
let dbMongo

async function run() {
  try {
    await client.connect()//ini buat mastiin mongo db connect dulu
    dbMongo = client.db(dbName);

  } catch (error){
    console.log(error);
  }
}

function getDb () {
  return dbMongo
}

module.exports = { run, getDb }