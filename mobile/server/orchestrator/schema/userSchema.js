const baseUrlUsers = "http://localhost:4001/users" || process.env.USER_SERVICE_URL
const axios = require("axios");
const redis = require("../config/redis");


const userTypeDefs = `#graphql
  type User {
    _id: ID,
    username: String,
    email: String,
    role: String,
    phoneNumber: String,
    address: String
  }

  type Query {
    showAllUser: [User]
    showUserById (id: ID): User
  }

  input FormUser {
    username: String,
    email: String,
    phoneNumber: String,
    address: String,
    password: String
  }
  type Mutation {
    register (user: FormUser): User
    deleteUser (id: ID): User
  }
`;

const userResolvers = {
  Query: {
    showAllUser: async () => {
      try {
        const cacheUsers = await redis.get("users");
        if (cacheUsers) {
          const data = JSON.parse(cacheUsers);
          return data;
        }
        const { data } = await axios.get(baseUrlUsers);
    
        const stringUser = JSON.stringify(data);
        await redis.set("users", stringUser);
        return data;
      } catch (error) {
        console.log(error, "<<< ini error di show all user");
        throw new Error(error.response.data.message);
      }
    },
    showUserById: async (_, args) => {
      try {
        const {id} = args
        const {data} = await axios(baseUrlUsers + "/" + id, {
          methods: 'get' 
        })
        return data
      } catch (error) {
       console.log(error.response.data, "<<< ini error di show user by id orchestrator");
       throw new Error(error.response.data.message);
      }
    }
  },

  Mutation: {
    register: async (_, args) => {
      try {
        const {user} = args
        const {data} = await axios({
          url: baseUrlUsers,
          method: "post",
          data: user
        })
        await redis.del("users");
        const _id = data.insertedId
        return {_id}
      } catch (error) {
        console.log(error.response.data, "<<< error register orchestrator")
        throw new Error(error.response.data.message);
      }
    },
    deleteUser: async (_, args) => {
      try {
        const {id} = args
        const {data} = await axios({
          url: baseUrlUsers + "/" + id,
          method: "delete"
        })
        await redis.del("users");
        return data.data
      } catch (error) {
        console.log(error.response.data, "<<< error register orchestrator")
        throw new Error(error.response.data.message);
      }
    } 
  }
};

module.exports = { 
  userTypeDefs, 
  userResolvers
}
