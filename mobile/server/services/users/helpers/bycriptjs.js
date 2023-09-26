const bycriptjs = require ("bcryptjs")

function hashPassword (password) {
 return bycriptjs.hashSync(password, 8)  
}

function comparePassword(password, hashPass) {
  return bycriptjs.compareSync(password, hashPass)
}

module.exports = {hashPassword, comparePassword}