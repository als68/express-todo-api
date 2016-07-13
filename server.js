const express = require('express');
const app = express();

//Middleware


app.use(express.static('public'));

app.get('/', (req, res) =>{
  res.send('HEY THERE');
});

var buzzwords; //need to cap at 5
buzzwords = ['one', 'two', 'three'];

app.get('/buzzwords', (req, res) =>{
  res.send({'All buzzwords: ': buzzwords});
});

app.post('/buzzword', (req, res) =>{
  if(buzzwords.length >= 5){
    console.log('Only 5 buzzwords allowed at a time');
  } else {
    console.log('Go ahead and add a buzzword');
  }
  res.send('This is where the POST request should be');
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