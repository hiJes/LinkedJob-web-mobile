const baseUrlJobs = "http://localhost:4002/jobs" || process.env.APP_SERVICE_URL
const axios = require("axios");
const redis = require("../config/redis");


const jobTypeDefs = `#graphql
  type Company {
    id: ID,
    name: String,
    companyLogo:String,
    location: String,
    email: String,
    description: String
  }

  type Job {
    id: ID,
    title: String,
    description: String,
    Company: Company,
    companyId: Int,
    userMongoId: ID,
    jobType: String,
  }
  
  type Query {
    showAllJob: [Job],
    showJobById (id: ID) : Job
  }

  input FormJob {
    title: String, 
    description: String, 
    companyId: Int, 
    jobType: String,
    userMongoId: String
  }

  type Mutation {
    addJob (job: FormJob) : Job
    deleteJob (id: ID): Job
    updateJob (id: ID, job: FormJob) : Job
  }
 
`;

const jobResolvers = {
  Query: {
    showAllJob : async function (){
      try {
       const jobsCache = await redis.get("jobs")
   
       if (jobsCache){
         const data = JSON.parse(jobsCache)
         return data
       }
       const {data} = await axios(baseUrlJobs, {
         methods: 'get' 
       })
       const stringJobs = JSON.stringify(data)
       await redis.set("jobs", stringJobs)
       return data
      } catch (error) {
        console.log(error, "<<< ini error di show jobs orchestrator");
      }
    },

    showJobById : async function (_, args) {
      try {
        const { id } = args
        const { data } = await axios.get (baseUrlJobs + "/" + id)
        return data
      } catch (error) {
        console.log(error, "<<< ini error di show job by id");
      }
    }
  },

  Mutation: {
    addJob: async (_, args) => {
      try {
        const {job} = args
        const {data} = await axios({
          url: baseUrlJobs,
          method: "post",
          data: job
        })
        await redis.del("jobs");
        return data
      } catch (error) {
        console.log(error.response.data, "<<< error register orchestrator")
        throw new Error(error.response.data.message);
      }
    },

    deleteJob: async (_, args) => {
      try {
        const {id} = args
        const {data} = await axios({
          url: baseUrlJobs + "/" + id,
          method: "delete"
        })
        await redis.del("jobs");
        return data.data
      } catch (error) {
        console.log(error.response.data, "<<< error delete job orchestrator")
        throw new Error(error.response.data.message);
      }
    },

    updateJob: async (_, args) => {
      try {
        const {id, job} = args
        console.log(args, "<<< tes");
        const {data} = await axios({
          url: baseUrlJobs + "/" + id,
          method: "put",
          data: job
        })
        await redis.del("jobs");
        return data.data
      } catch (error) {
        console.log(error.response.data, "<<< error update job orchestrator")
        throw new Error(error.response.data.message);
      }
    },
  }
};

module.exports = { 
  jobTypeDefs, 
  jobResolvers
}
