
const { comparePassword } = require("../helpers/bycriptjs")
const { createToken } = require("../helpers/jwt")
const { User, Company, Job, Skill, sequelize } = require("../models")

class ControllerAdmin {
  static async login (req, res, next) {
    try {
      let {email, password} = req.body
      if (!email) {
        throw ({name: "dataEmpty", message: "Email is required!"})
      } 
      if (!password) {
        throw ({name: "dataEmpty", message: "Password is required!"})
      }

      const user = await User.findOne({where: {email}})

      if (!user) {
        throw ({name: "unauthorize"})
      }

      const validPassword = comparePassword(password, user.password)
      if (!validPassword) {
        throw ({name: "unauthorize"})
      }
      const payload = {
        id: user.id
      }
      const access_token = createToken(payload)
      // console.log(access_token);

      res.status (200).json({
        access_token, username:user.username, email: user.email
      })
    } catch (err) {
      console.log(err, "<<< ini error login");
      next(err)
    }
  }

  static async register(req, res, next){
    try {
      let {username, email, password, phoneNumber, address} = req.body
      const user = await User.create({
        username, email, password,
        role:"admin",
        phoneNumber, address
      })
      res.status (201).json({ message: "Added new admin successfully" })
    } catch (err) {
      console.log(err, "<<< ini error regis");
      next(err)
    }
  }

  static async showAllJob (req, res, next) {
    try{
      let option = {
        attributes:{exclude:['createdAt', 'updatedAt']},
        include:[
          {
            model: User,
            attributes: ['username']
          }, 
          {
            model: Company,
            attributes: ['name']
          }, 
          {
            model: Skill,
            attributes: ['id', 'name', 'level']
          },
        ],
        order:[['id', 'asc']],
      }
      const jobs = await Job.findAll(option)
      res.status (200).json(jobs)
    } catch (err) {
      console.log(err, "<<< ini error show all job");
      next(err)
    }
  }

  static async showAllCompany (req, res, next) {
    try{
      const companies = await Company.findAll({
        attributes:{exclude:['createdAt', 'updatedAt']},
        order:[['id', 'asc']],
      })
      res.status (200).json(companies)
    } catch (err) {
      console.log(err, "<<< ini error show all company");
      next(err)
    }
  }

  static async addJob (req, res, next) {
    const t = await sequelize.transaction();
    try{
      let {jobState, skillState} = req.body
      console.log(req.body, "<<< data");
      console.log(skillState, "<<< data");
      const { title, description, companyId, jobType } = jobState

      const job = await Job.create({ title, description, companyId, authorId: 1, jobType }, { transaction: t })
      
      skillState = skillState.map(el => {
        if (!el.name){
          throw ({name: "dataEmpty", message: "Skill name is required!"})
        } else if (!el.level){
          throw ({name: "dataEmpty", message: "Skill level is required!"})
        }
        el.jobId = job.id
        el.createdAt = el.updatedAt = new Date ()
        return el
      })
      const skills = await Skill.bulkCreate(skillState, { transaction: t })
      await t.commit();
      res.status (201).json({job, skills})
    } catch (err) {
      console.log(err, "<< error dari add job");
      await t.rollback();
      next(err)
    }
  }

  static async addCompany (req, res, next) {
    try{
      const { name, companyLogo, location, email, description } = req.body
      const addCompany = await Company.create({ name, companyLogo, location, email, description })
      res.status (201).json(addCompany)
    } catch (err) {
      console.log(err, "<< error dari add company");
      next(err)
    }
  }

  static async deleteJob (req, res, next) {
    try{
      let {id} = req.params
      const job = await Job.destroy({where: {id}})
      if (!job) {
        throw ( {name: "notFound", message: `Job with id ${id} is not found`})
      }
      res.status (200).json({message: `Job with id ${id} delete successfully`})
    } catch (err) {
      console.log(err, "<< error dari delete job");
      next (err)
    }
  }

  static async deleteCompany (req, res, next) {
    try{
      let {id} = req.params
      const company = await Company.destroy({where: {id}})
      if (!company) {
        throw ( {name: "notFound", message: `Company with id ${id} is not found`})
      }
      res.status (200).json({message: `Company with id ${id} delete successfully`})
    } catch (err) {
      console.log(err, "<< error dari delete job");
      next (err)
    }
  }

  static async updateCompany (req, res, next) {
    try {
      let {id} = req.params
      let findCompany = await Company.findByPk(id)
      if (!findCompany) {
        throw ( {name: "notFound", message: `Company with id ${id} is not found`})
      }
      let {name, companyLogo, location, email, description} = req.body
      console.log(req.body.name);
      let companyUpdate = await Company.update({name, companyLogo, location, email, description}, {
        where: { id }
      });
      res.status (200).json({message: `Success update company with id ${id}`})
    } catch (err) {
      console.log(err, "<< error dari update company");
      next (err)
    }

  }

  static async companyDetail (req, res, next) {
    try{
      let {id} = req.params
      const company = await Company.findByPk(id)
      if (!company) {
        throw ( {name: "notFound", message: `Company with id ${id} is not found`})
      }
      res.status (200).json(company)
    } catch (err) {
      console.log(err, "<< error dari company detail"); 
      next(err)
    }
  }

  static async jobDetail (req, res, next) {
    try{
      let {id} = req.params
      const job = await Job.findByPk(id, {
        include:[
          {
            model: User,
            attributes: ['username']
          }, 
          {
            model: Company,
            attributes: ['name']
          }, 
          {
            model: Skill,
            attributes: ['id', 'name', 'level']
          },
        ],
      })
      if (!job) {
        throw ( {name: "notFound",  message: `Job with id ${id} is not found`})
      }
      res.status (200).json(job)
    } catch (err) {
      console.log(err, "<< error dari job detail");  
      next(err)
    }
  }

  static async updateJob (req, res, next) {
    try {
      let {id} = req.params
      let findJob = await Job.findByPk(id)
      if (!findJob) {
        throw ( {name: "notFound", message: `Job with id ${id} is not found`})
      }
      let {title, description, companyId, jobType} = req.body
      let JobUpdate = await Job.update({title, description, companyId, jobType}, {
        where: { id }
      });
      res.status (200).json({message: `Success update job with id ${id}`})
    } catch (err) {
      console.log(err, "<< error dari update job");
      next (err)
    }

  }
}

module.exports = ControllerAdmin