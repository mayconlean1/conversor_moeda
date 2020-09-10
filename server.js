const fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var moedaBase = ''
var moedaFinal = ''
var valor = '1'

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/' , async function(req ,res){
  moedaBase = 'USD'
  moedaFinal = 'BRL'
  fs.writeFileSync('parMoeda.json' ,JSON.stringify([moedaBase , moedaFinal]) , {encoding: 'utf-8'})
  res.sendFile(__dirname + '/load.html')
});

app.get('/main' , function(req ,res){
  res.sendFile(__dirname + '/index.html')
});

app.get('/moeda_paises.json' , function(req ,res){
    res.sendFile(__dirname+'/moeda_paises.json')
  });

app.get('/script.js' , function(req ,res){
    res.sendFile(__dirname + '/script.js')
});

app.get('/parMoeda.json' , function(req ,res){
  res.sendFile(__dirname + '/parMoeda.json')
});

app.get('/_imagens/eur.png' , function(req ,res){
  res.sendFile(__dirname + '/_imagens/eur.png')
});

app.get('/_imagens/eur.png' , function(req ,res){
  res.sendFile(__dirname + '/_imagens/eur.png')
});

app.get('/_imagens/gbp.png' , function(req ,res){
  res.sendFile(__dirname + '/_imagens/gbp.png')
});

/*

app.get('/usd.png' , function(req ,res){
  res.sendFile(__dirname + '/usd.png')
});
*/
app.post('/post' ,async (req ,res) =>{
  console.log('antes', req.body.nsel1 ,  req.body.nsel2 , req.body.ntxtq)
  moedaBase = req.body.nsel1
  moedaFinal = req.body.nsel2
  valor = req.body.ntxtq > 0 ? req.body.ntxtq : '1'
  console.log('depois' , moedaBase , moedaFinal , valor )


   fs.writeFile('parMoeda.json', JSON.stringify([req.body.nsel1 , req.body.nsel2, req.body.ntxtq]),'utf8', (err) => {
    if (err) throw err;
    fs.readFile('parMoeda.json', 'utf8',(err, data) => {
      if (err) throw err;
      let par = eval(data)
      console.log(data , par);
      res.sendFile(__dirname + '/post.html')
      
    });
    console.log('The file has been saved!');
    
  });

  //fs.writeFileSync('parMoeda.json' ,JSON.stringify([req.body.nsel1 , req.body.nsel2, req.body.ntxtq]) , {encoding: 'utf-8'})
 
  
  
  });



app.listen('8080')

