'use strict';
const app = require('./server');
const PORT = process.env.PORT || 3000;

//app.listen(PORT);

const server = app.listen(PORT, function(){
  let host = server.address().address;
  //let port = server.address().port;
  console.log('Listening at port ' + PORT);
});