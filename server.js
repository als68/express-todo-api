const express = require('express');
const app = express();

//Middleware
const bodyParser = require('body-parser');

app.use(express.static('public'));

//Make Middleware useable
app.use(bodyParser.json({ type: 'application/*+json' }));

var jsonParser = bodyParser.json();

var buzzwords =[];

app.get('/', (req, res) =>{
  res.send('Welcome!');
});

app.get('/buzzwords', (req, res) =>{
    res.send({'All buzzwords currently: ': buzzwords});
  });

app.post('/buzzword', jsonParser, (req, res) => {
  if(buzzwords.length >= 5){
    console.log('Error: Only 5 buzzwords allowed at a time');
    res.send({ "success": false });
  } else {
    console.log('Adding buzzword a success');
    buzzwords.push(req.body);
    console.log(buzzwords);
    res.send({ "success": true });
  }
});

app.put('/buzzword', (req, res) =>{
    res.send('This is where the PUT request should be');
  });

app.delete('/buzzword', (req, res) =>{
    res.send('This is where the DELETE request should be');
  });

app.post('/reset', (req, res) =>{
    res.send('This is where the POST RESET request should be');
  });

const server = app.listen(3000, function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Listening at port 3000');
});