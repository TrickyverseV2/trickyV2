// Error middleware for express

//Default function is exported to be a middleware and handle all errors
export default (err, res) => {
  //If the err object has a statusCode field, use that or default error code is 500
  //If the err object has a customMessage field, use that or default message is "Please contact the ADMIN"
  //Storing error response in a constant
  const errorResponse = {
    status: err.statusCode ? err.statusCode : 500,
    message: err.customMessage ? err.customMessage : 'Please contact the ADMIN'
  }
  //If env is dev, send the err stack
  errorResponse.err_stack = err
  //Send the response to the consumer
  res.status(errorResponse.status).send(errorResponse)
}
