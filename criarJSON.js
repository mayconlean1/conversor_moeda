const puppeteer = require('puppeteer'); 
const fs = require('fs'); 

const robo = async () =>{
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    const url = `https://pt.wikipedia.org/wiki/ISO_4217`
    await page.goto(url);
    //await page.screenshot({path: 'example.png'});
    var paises =  await page.evaluate(()=>{
      function isNumber(numero){
        let tnumero = String(Number(numero)) == numero
        return tnumero
      }
      let tempPais = {}
      let baseRoot =  document.querySelector('.wikitable.sortable.jquery-tablesorter').children[1].children
      for(tr in baseRoot){
        if(isNumber(tr)){                      
          let tempSigla = baseRoot[tr].children[0].textContent
          let tempMoeda = baseRoot[tr].children[3].textContent
          let imgBandeira = ''
          let baseLocais = baseRoot[tr].children[4].children
                                            
          for(l in baseLocais){
            if(l != null){
              if(isNumber(l)){               
                if (baseLocais[l].localName == 'a'){
                  tempPais[baseLocais[l].textContent] = {'moeda': tempMoeda , 'sigla': tempSigla , 'bandeira': imgBandeira}
                  imgBandeira = ''
                }
                else if(baseLocais[l].localName == 'img'){
                  imgBandeira = baseLocais[l].src
                }
                else if(baseLocais[l].localName == 'span'){
                  imgBandeira = baseLocais[l].children[0].src
                }                               
                /*
                if (baseLocais[l].children[0] == undefined){
                  tempPais[baseLocais[l].textContent] = {'moeda': tempMoeda , 'sigla': tempSigla , 'bandeira': imgBandeira}
                  imgBandeira = ''
                }else{
                  imgBandeira = baseLocais[l].children[0].src
                }
                */            
              }
            }
          } 
        } 
      }
      
      return tempPais                          
    })
    fs.writeFileSync('moeda_paises.json' , JSON.stringify(paises) )
    await browser.close();
  }
robo()
