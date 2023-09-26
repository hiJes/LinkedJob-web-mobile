'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.User, {foreignKey: "authorId"})
      Job.belongsTo(models.Company, {foreignKey: 'companyId'})
      Job.hasMany(models.Skill, {foreignKey:'jobId'})
    }
  }
  Job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title job is required!"
        },
        notNull: {
          msg: "Title job is required!"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required!"
        },
        notNull: {
          msg: "Description is required!"
        }
      }
    },
    companyId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Job type is required!"
        },
        notNull: {
          msg: "Job type is required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};