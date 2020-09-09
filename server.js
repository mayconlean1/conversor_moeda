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

app.post('/post1' ,async (req ,res) =>{
  moedaBase = req.body.nsel1
  fs.writeFileSync('parMoeda.json' ,JSON.stringify([moedaBase , moedaFinal , valor]) , {encoding: 'utf-8'})
  res.sendFile(__dirname + '/post.html')
  });

app.post('/post2' ,async (req ,res) =>{
  moedafinal = req.body.nsel2
  fs.writeFileSync('parMoeda.json' ,JSON.stringify([moedaBase , moedaFinal , valor]) , {encoding: 'utf-8'})
  res.sendFile(__dirname + '/post.html')
});

app.post('/post3' ,async (req ,res) =>{
  valor = req.body.ntxtq > 0 ? req.body.ntxtq : '1'
  fs.writeFileSync('parMoeda.json' ,JSON.stringify([moedaBase , moedaFinal , valor]) , {encoding: 'utf-8'})
  res.sendFile(__dirname + '/post.html')
});

app.listen('8080')

