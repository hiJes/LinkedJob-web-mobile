'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Job, {foreignKey: "companyId"})
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Company name is required!"
        },
        notNull: {
          msg: "Company name is required!"
        }
      }
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Url for company logo is required!"
        },
        notNull: {
          msg: "Url for company logo is required!"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Location is required!"
        },
        notNull: {
          msg: "Location is required!"
        }
      }
    },
    email: DataTypes.STRING,
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
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};