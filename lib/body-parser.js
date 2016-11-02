module.exports = function createBodyParser() {
  return function(request, response, next) {
    let body ='';
    request.on('data', data => {
      body += data;
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(body);
        next();
      }
      catch(err) {
        err.code = 400;
        err.message = 'Invalid JSON';
        next(err);
      }
    });
  };
};
