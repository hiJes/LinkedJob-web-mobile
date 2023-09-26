function errorHandler (err, req, res, next) {
  let status = 500
  let message = "Internal Server Error"

  console.log(err, "<< ini di error handler");

  if (err.name === "SequelizeValidationError"|| err.name === "SequelizeUniqueConstraintError") {
    status = 400
    message = err.errors[0].message
  } else if (err.name === "SequelizeForeignKeyConstraintError"){
    status = 400
    message = "Company is required!"
  }else if (err.name === "dataEmpty"){
    status = 400
    message = err.message
  } else if (err.name === "unauthorize") {
    status = 401
    message = "Invalid email/password"
  } else if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
    status = 401
    message = "Invalid token"
  } else if (err.name === "notFound") {
    status = 404
    message = err.message
  } 

  res.status(status).json({message})
}
module.exports = errorHandler