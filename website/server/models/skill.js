'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      Skill.belongsTo(models.Job, {foreignKey:"jobId"})
    }
  }
  Skill.init({
    jobId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Skill name is required!"
        },
        notNull: {
          msg: "Skill name is required!"
        }
      }
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Level skill is required!"
        },
        notNull: {
          msg: "Level skill is required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};