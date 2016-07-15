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

function validationCheck(req, res, next){
  switch(req.method){
    case 'POST':
      if(req.route.path === '/buzzword' && Object.keys(req.body)[0] === 'buzzWord' && Object.keys(req.body)[1] === 'points' && req.body.buzzWord !== undefined && req.body.points !== undefined && typeof req.body.buzzWord === 'string' && typeof req.body.points === 'number'){
        console.log('THIS IS A VALID POST BUZZWORD REQUEST');
        return next();
      } else if(req.route.path === '/reset' && Object.keys(req.body)[0] === 'reset' && req.body.reset !== undefined && typeof req.body.reset === 'boolean' && req.body.reset === true){
        console.log('THIS IS A VALID RESET REQUEST');
        return next();
      } else {
        console.log('THIS IS NOT A VALID POST REQUEST');
      }
      break;

    case 'PUT':
      if(req.route.path === '/buzzword' && Object.keys(req.body)[0] === 'buzzWord' && Object.keys(req.body)[1] === 'heard' && req.body.buzzWord !== undefined && req.body.heard !== undefined && typeof req.body.buzzWord === 'string' && typeof req.body.heard === 'boolean'){
        console.log('THIS IS A VALID PUT REQUEST');
        return next();
      } else {
        console.log('THIS IS NOT A VALID PUT REQUEST');
      }
      break;

    case 'DELETE':
      if(req.route.path === '/buzzword' && Object.keys(req.body)[0] === 'buzzWord' && req.body.buzzWord !== undefined && typeof req.body.buzzWord === 'string'){
        console.log('THIS IS A VALID DELETE REQUEST');
        return next();
      } else {
        console.log('THIS IS NOT A VALID DELETE REQUEST');
      }
      break;

    default:
      console.log('THIS IS AN INVALID REQUEST');
  }
}


app.post('/buzzword', jsonParser, validationCheck, (req, res) => {
  if(buzzwordsArray.length >= 5){
    console.log('Error: Only 5 buzzwords allowed at a time');
    res.send({ "success": false });
  } else {
    console.log('Adding buzzword a success');
    buzzwordsArray.push(req.body);
    res.send({ "success": true });
  }
});

app.put('/buzzword', jsonParser, validationCheck, (req, res) =>{
  for(var i = 0; i < buzzwordsArray.length; i++){
    if(buzzwordsArray[i].buzzWord === req.body.buzzWord && req.body.heard === true){
      runningTotal = runningTotal + buzzwordsArray[i].points;
      console.log('Buzzword exists, heard = true, current score: ' + runningTotal);
      buzzwordsArray[i].heard = req.body.heard;
      res.send({ "success": true , newScore: runningTotal});
      return;
    } else if (buzzwordsArray[i].buzzWord === req.body.buzzWord && req.body.heard !== true){
      runningTotal = runningTotal - buzzwordsArray[i].points;
      console.log('Buzzword exists, heard = false, current score: ' + runningTotal);
      buzzwordsArray[i].heard = req.body.heard;
      res.send({ "success": true , newScore: runningTotal});
      return;
    }
  }
  console.log('Buzzword doesn\'t exist, no change to current score: ' + runningTotal);
  res.send({ "success": false , newScore: runningTotal});
  return;
});

app.delete('/buzzword', jsonParser, validationCheck, (req, res) =>{
  for(var i = 0; i < buzzwordsArray.length; i++){
    if(buzzwordsArray[i].buzzWord === req.body.buzzWord){
      console.log('That element exists, let\'s delete it');
      buzzwordsArray.splice(i,1);
      res.send({ "success": true });
      return;
    }
  }
  console.log('Can\'t delete an item that doesn\'t exist');
  res.send({ "success": false });
  return;
});

app.post('/reset', jsonParser, validationCheck, (req, res) =>{
  runningTotal = 0;
  console.log('Running total has been cleared: ' + runningTotal);
  buzzwordsArray = [];
  console.log('buzzwordsArray has been cleared, shown below');
  console.log(buzzwordsArray);
  res.send({ "success": true });
});

module.exports = app;