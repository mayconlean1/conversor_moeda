var pais= ''
var par = ''
var siglas = []
var dados = {}

function atualizar(s){
    let form = document.getElementsByName(s)
    console.log(form)
    document.forms[s].submit()
}

function teste(){
    let datalist = document.getElementById('dlopc')
    let txt1 = document.querySelector('#ctxt1')
    console.log(datalist , txt1)   
}

function compararAtualizar(idtxt , idsel , idimg){
  let txt = removerAcentos(document.getElementById(idtxt).value.replace(/ /gi, '')).toUpperCase() //idtxt getElementById('ctxt1')
  let sel = document.getElementById(idsel) // idsel .getElementById('csel1')
  let img = document.getElementById(idimg) // idimg
  sel.innerHTML = ''
  for (s of siglas){
    if (dados[txt].sigla == s){
      sel.innerHTML += `<option selected>${s}</option>`
      if(dados[txt].bandeira == ''){
        if (dados[txt].sigla == 'USD'){
          img.src = '_imagens/usd.png'
        }
        else if (dados[txt].sigla == 'EUR'){
          img.src = '_imagens/eur.png'
        }
        else if (dados[txt].sigla == 'GBP'){
          img.src = '_imagens/gbp.png'
        }
        else{
          img.src = ''
        }
      }else{
        img.src = dados[txt].bandeira
      }
    }else{
      sel.innerHTML += `<option>${s}</option>`
    }
    
  }
  console.log(dados[txt])
}

const ajaxParMoeda = ()=>{
  let ajax = new XMLHttpRequest();
    ajax.open('GET' ,'parMoeda.json')
    ajax.onreadystatechange = function(){
      if (ajax.readyState === 4 && ajax.status === 200){
        par =  JSON.parse(ajax.responseText)
        ajaxMoedaPais()
      }
    };
    ajax.onreadystatechange()
    ajax.send()
}

const ajaxMoedaPais = () => {
  let ajax = new XMLHttpRequest();
    ajax.open('GET' , 'moeda_paises.json')
    ajax.onreadystatechange = function(){
      
      if (ajax.readyState === 4 && ajax.status === 200){
        let datalist = document.getElementById('dlopc')
        let sel1 = document.getElementById('csel1')
        let sel2 = document.getElementById('csel2')
        let tempSiglas = []
        pais =  JSON.parse(ajax.responseText)
        console.log(pais)
        for(p in pais){
          let ps = removerAcentos(p)
          let ms = removerAcentos(pais[p].moeda)
          dados[p.toUpperCase().replace(/ /gi, '')] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira}
          dados[ps.toUpperCase().replace(/ /gi, '')] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira}
          dados[pais[p].moeda.toUpperCase().replace(/ /gi, '')] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira}
          dados[ms.toUpperCase().replace(/ /gi, '')] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira}
          dados[pais[p].sigla] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira}
          dados.ESTADOSUNIDOS = {'sigla': 'USD' , 'bandeira': '//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/22px-Flag_of_the_United_States.svg.png'}
          datalist.innerHTML += `
          <option value="${p}"></option>
          <option value="${ps}"></option>
          <option value="${pais[p].moeda}"></option>
          <option value="${ms}"></option>
          `
          tempSiglas.push(pais[p].sigla)             
        }
        siglas = [...semRepetir(tempSiglas ,true ) ]
    
        for(s of siglas){
          datalist.innerHTML += ` <option value="${s}"></option> `
          sel1.innerHTML += par[0] != s? `<option>${s}</option>` : `<option selected>${s}</option>`
          sel2.innerHTML += par[1] != s? `<option>${s}</option>` : `<option selected>${s}</option>`         
        }                 
      }
    };
    ajax.onreadystatechange()
    ajax.send()
}

var load = ()=>{
  ajaxParMoeda()
}

function semRepetir(array , organizar = false){ 
  //tira as repetiçoes do array , pode organizar colocando o segundo parammetro true
  let tempObjt = new Object
  let organiza = []
  if(organizar){
      for (i in array){
          tempObjt[array[i]] = i
      }
      organiza = [...Object.keys(tempObjt)]   
  }
  else{
      for (ind in array){
          tempObjt[array[ind]] = ind == 0? true : ind
      }
      for(i of array){
          for(t in tempObjt){
              if (i == t){
                  if(tempObjt[t] != false){
                      organiza.push(i)
                      tempObjt[t] = false
                  }
              }    
          }
      }
  }
  return organiza
}

function removerAcentos(string){ // Substitui algumas acentuações conhecidas
  let str = string
  const listaAcentos = {
      'a' :'áàâãä', 
      'e':'éèêë' , 
      'i':'íìîï',
      'o':'óòôõö',
      'u':'úùûü' , 
      'n':'ñ',
      'c':'ç',
      'y': 'ý'
  }
  for(l in listaAcentos){
      let la = listaAcentos[l]
      let ula = listaAcentos[l].toUpperCase()
      let mlb = l.toUpperCase()
      str = eval(`str.replace(/[${la}]/,"${l}")`)
      str = eval(`str.replace(/[${ula}]/,"${mlb}")`)
  }
  return str
}


console.log('foi')
