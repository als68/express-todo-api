const express = require('express');
const app = express();

//Middleware
const bodyParser = require('body-parser');

app.use(express.static('public'));

//Make Middleware useable
app.use(bodyParser.json({ type: 'application/*+json' }));

var jsonParser = bodyParser.json();

var buzzwordsArray = [];

var runningTotal = 0;

app.get('/', (req, res) =>{
  res.send('Welcome!');
});

app.get('/buzzwords', (req, res) =>{
  res.send({'All buzzwords currently: ': buzzwordsArray});
});

app.post('/buzzword', jsonParser, (req, res) => {
  if(buzzwordsArray.length >= 5){
    console.log('Error: Only 5 buzzwords allowed at a time');
    res.send({ "success": false });
  } else {
    console.log('Adding buzzword a success');
    buzzwordsArray.push(req.body);
    console.log(req.body.buzzWord);
    console.log('the array right now: ');
    console.log(buzzwordsArray);
    res.send({ "success": true });
  }
});

app.put('/buzzword', jsonParser, (req, res) =>{

  for(var i = 0; i < buzzwordsArray.length; i++){
    if(buzzwordsArray[i].buzzWord === req.body.buzzWord){
      runningTotal = runningTotal + buzzwordsArray[i].points;
      console.log('Buzzword exists, current score: ' + runningTotal);

      buzzwordsArray[i].heard = req.body.heard;
      console.log(buzzwordsArray);

      res.send({ "success": true , newScore: runningTotal});
      return;
    }
  }
  runningTotal = runningTotal - buzzwordsArray[i].points;
  console.log('Buzzword doesn\'t exist, current score: ' + runningTotal);
  res.send({ "success": false , newScore: runningTotal});
  return;
});

app.delete('/buzzword', jsonParser, (req, res) =>{
  for(var i = 0; i < buzzwordsArray.length; i++){
    if(buzzwordsArray[i].buzzWord === req.body.buzzWord){
      console.log('That element exists, let\'s delete it');
      buzzwordsArray.splice(i,1);
      console.log(buzzwordsArray);
      res.send({ "success": true });
      return;
    }
  }
  console.log('Can\'t delete an item that doesn\'t exist');
  res.send({ "success": false });
  return;
});

app.post('/reset', (req, res) =>{
  runningTotal = 0;
  console.log('Running total has been cleared: ' + runningTotal);
  buzzwordsArray = [];
  console.log('buzzwordsArray has been cleared: ' + buzzwordsArray);
  console.log(buzzwordsArray);
  res.send({ "success": true });
});

const server = app.listen(3000, function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('Listening at port 3000');
});