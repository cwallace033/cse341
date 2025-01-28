const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Contacts API',
  },
  host: 'https://cse341-hx1h.onrender.com/',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];


swaggerAutogen(outputFile, routes, doc);