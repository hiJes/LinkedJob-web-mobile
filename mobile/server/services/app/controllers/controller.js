
const { Company, Job, sequelize } = require("../models")

class Controller {

  static async showAllJob (req, res, next) {
    try{
      let option = {
        attributes:{exclude:['createdAt', 'updatedAt']},
        include:[ 
          {
            model: Company,
            attributes: ['name', 'companyLogo', 'location']
          }
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

  static async addJob (req, res, next) {
    const t = await sequelize.transaction();
    try{
      const { title, description, companyId, jobType, userMongoId } = req.body

      const job = await Job.create({ title, description, companyId, jobType,  userMongoId }, { transaction: t })
      
      await t.commit();
      res.status (201).json(job)
    } catch (err) {
      console.log(err, "<< error dari add job");
      await t.rollback();
      next(err)
    }
  }

  static async deleteJob (req, res, next) {
    try{
      let {id} = req.params
      const findJob = await Job.findByPk(id)
      if (!findJob) {
        throw ( {name: "notFound", message: `Job with id ${id} is not found`})
      }
      const job = await Job.destroy({where: {id}})
      res.status (200).json({data: findJob, message: `Job with id ${id} delete successfully`})
    } catch (err) {
      console.log(err, "<< error dari delete job");
      next (err)
    }
  }

  static async jobDetail (req, res, next) {
    try{
      let {id} = req.params
      const job = await Job.findByPk(id, {
        include:[
          {
            model: Company,
            attributes: ['name','companyLogo', 'location']
          }
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
      let findUpdatedJob = await Job.findByPk(id)
      res.status (200).json({data: findUpdatedJob, message: `Success update job with id ${id}`})
    } catch (err) {
      console.log(err, "<< error dari update job");
      next (err)
    }

  }
}

module.exports = Controller