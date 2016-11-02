module.exports = function errorHandler(err, request, response, next) {//eslint-disable-line
  const code = err.code || 500;
  const message = code === 500 ? 'SERVER ERROR!!' : err.message;
  console.error(code, message);
  response.status(code).send(`${code} ERROR: ${message}`);  
};
