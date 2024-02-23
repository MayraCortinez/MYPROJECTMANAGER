const cookieMiddleware = (req, res, next) => {
    // Función para establecer una cookie en la respuesta
    res.setCookie = (name, value, options) => {
      res.cookie(name, value, options);
    };
  
    // Función para obtener el valor de una cookie de la solicitud
    req.getCookie = (name) => {
      return req.cookies[name];
    };
  
    next();
  };
  
  module.exports = cookieMiddleware;
  