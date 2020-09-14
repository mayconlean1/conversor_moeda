const puppeteer = require('puppeteer'); 
const fs = require('fs'); 

exports.criarJson = async () =>{
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  const url = `https://pt.wikipedia.org/wiki/ISO_4217`
  await page.goto(url);
  //await page.screenshot({path: 'example.png'});
  var paises =  await page.evaluate(()=>{
    let tempPais = {}
    let baseRoot =  document.querySelector('.wikitable.sortable.jquery-tablesorter').children[1].children
    for(tr in baseRoot){
      if(null != tr){
        if(String(Number(tr)) == tr){                      
          let tempSigla = baseRoot[tr].children[0].textContent
          let tempMoeda = baseRoot[tr].children[3].textContent
          let imgBandeira = ''
          let baseLocais = baseRoot[tr].children[4].children                               
          for(l in baseLocais){
            if(null != l){
              if(String(Number(l)) == l){               
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
                    
              }
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

exports.cotacao = async (moedaBase , moedaFinal , valor) =>{
const mb = moedaBase
const mf = moedaFinal

const browser = await puppeteer.launch({headless:true});
const page = await browser.newPage();
const url = `https://www.google.com/search?ei=rLtbX_3NO6DC5OUPoO2loAc&q=${mb}+${mf}+cotacao&oq=${mb}+${mf}+cotacao&gs_lcp=CgZwc3ktYWIQAzIHCAAQRhCCAjIICAAQFhAKEB4yCAgAEBYQChAeMggIABAWEAoQHjoECAAQQzoHCAAQsQMQQzoFCAAQsQM6CAgAELEDEIMBOgIIADoKCAAQsQMQgwEQQzoECAAQCjoGCAAQFhAeUO17WPuQAWDckwFoAHAAeACAAccCiAGpDJIBBzAuMS41LjGYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwj909Dj1-HrAhUgIbkGHaB2CXQQ4dUDCA0&uact=5`
await page.goto(url);

//await page.focus(".ZEB7Fb.vk_gy.vk_sh.Hg3mWc")
//await page.keyboard.type( valor)

var tempVal =  await page.evaluate(v=>{  
    return document.querySelector('.DFlfde.SwHCTb').textContent
    //document.querySelector('.ZEB7Fb.vk_gy.vk_sh.Hg3mWc').value = v
    //console.log(document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value)        
    //console.log(document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value)
    //return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value                        
} /*, valor */) // ######## Passa o valor por aqui

//fs.writeFileSync('moeda_paises.json' , JSON.stringify(paises) )
//console.log(Number(tempVal.replace(/,/ , '.')) * Number(valor))
await browser.close();
return Number(tempVal.replace(/,/ , '.')) * Number(valor)
}
