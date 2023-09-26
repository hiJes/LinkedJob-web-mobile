const { User, Company, Job, Skill, sequelize } = require("../models")

class ControllerUser {
  static async showAllJob (req, res, next) {
    try{
      let option = {
        attributes:{exclude:['createdAt', 'updatedAt']},
        include:[
          {
            model: Company,
            attributes: ['name', 'companyLogo']
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
      console.log(err, "<<< ini error show all job for customer");
      next(err)
    }
  }

  static async jobDetail (req, res, next) {
    try{
      let {id} = req.params
      const job = await Job.findByPk(id, {
        include:[
          {
            model: Company,
            attributes: ['name','companyLogo', 'id']
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
      console.log(err, "<< error dari job detail for customer");  
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
      console.log(err, "<<< ini error show all company for customer");
      next(err)
    }
  }

  static async companyDetail (req, res, next) {
    try{
      let {id} = req.params
      const company = await Company.findByPk(id, {
        include:[Job],
      })
      if (!company) {
        throw ( {name: "notFound", message: `Company with id ${id} is not found`})
      }
      res.status (200).json(company)
    } catch (err) {
      console.log(err, "<< error dari company detail for customer"); 
      next(err)
    }
  }
}

module.exports = ControllerUser