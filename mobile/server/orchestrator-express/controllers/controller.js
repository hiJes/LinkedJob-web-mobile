const axios = require("axios");
const redis = require("../config/redis");
const baseUrlUsers = "http://localhost:4001/users" 
const baseUrlJobs = "http://localhost:4002/jobs"

class Controller {
  static async showAllUser (req, res){
    try {
     const usersCache = await redis.get("users")
 
     if (usersCache){
       console.log(usersCache,"<<< dari redis");
       const data = JSON.parse(usersCache)
       return res.status(200).json(data)
     }
     const {data} = await axios(baseUrlUsers, {
       methods: 'get' 
     })
     console.log(data,"<<< dari axios");
     const stringUsers = JSON.stringify(data)
     await redis.set("users", stringUsers)
     res.status(200).json(data)
    } catch (error) {
     console.log(error, "<<< ini error di show users orchestrator");
     res.status(500).json(error)
    }
  }
  static async showAllJob (req, res){
   try {
    const jobsCache = await redis.get("jobs")

    if (jobsCache){
      console.log(jobsCache,"<<< dari redis");
      const data = JSON.parse(jobsCache)
      return res.status(200).json(data)
    }
    const {data} = await axios(baseUrlJobs, {
      methods: 'get' 
    })
    console.log(data,"<<< dari axios");
    const stringJobs = JSON.stringify(data)
    await redis.set("jobs", stringJobs)
    res.status(200).json(data)
   } catch (error) {
      console.log(error, "<<< ini error di show jobs orchestrator");
      res.status(500).json(error)
    }
  }
  static async showUserById (req, res){
    try {
      const {id} = req.params
      const {data} = await axios(baseUrlUsers + "/" + id, {
        methods: 'get' 
      })
      res.status(200).json(data)
    } catch (error) {
     console.log(error, "<<< ini error di show user by id orchestrator");
     res.status(500).json(error)
    }
  }
  static async showJobById (req, res){
    try {
      const {id} = req.params
      const {data} = await axios(baseUrlJobs + "/" + id, {
        methods: 'get' 
      })
      res.status(200).json(data)
    } catch (error) {
      console.log(error, "<<< ini error di show job by id orchestrator");
      res.status(500).json(error)
    }
  }
}

module.exports = Controller