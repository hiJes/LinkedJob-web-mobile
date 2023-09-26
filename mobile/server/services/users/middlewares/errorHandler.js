function errorHandler (err, req, res, next)  {
  let status = 500
  let message = "Internal Server Error"

  console.log(err, "<<< di error handler");

  if(err.name === "found"){
    status = 400
    message = err.message
  } else if(err.name === "MongoServerError"){
    status = 400
    message = err.message
  } else if(err.name === "dataEmpty"){
    status = 400
    message = err.message
  } else if(err.name === "minValidation"){
    status = 400
    message = err.message
  } else if(err.name === "emailFormat"){
    status = 400
    message = err.message
  } else if(err.name === "notFound" || err.name === "BSONError"){
    status = 404
    message = err.message
  } 
  res.status(status).json({message})
}

module.exports= errorHandler