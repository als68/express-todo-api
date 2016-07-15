'use strict';
const app = require('./server');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, function(){
  let host = server.address().address;
  console.log('Listening at port ' + PORT);
});