var pais= ''
var par = ''
var siglas = []
var dados = {}

function atualizar(){
  sessionStorage.setItem('ctxtq' , document.getElementById('ctxtq').value)
  document.forms['form'].submit()
}

function teste(){
  console.log(document.getElementById('ctxt1').value == '')
}

function compararAtualizarSigla(idsel , idimg){
  let sel = document.getElementById(idsel).children
    //let img = document.getElementById('img1')
    let selecionado = ''
    for(s of sel){
      if(s.selected ){
        selecionado = s.value
      }
    }
    addImg(dados[selecionado] , idimg)
    //img.src = dados[selecionado].bandeira
    console.log(dados[selecionado].bandeira)
    atualizar()
    
}

function addImg(dadosindex , idimge){
  let localImagem = document.getElementById(idimge)
    if (dadosindex.sigla == 'USD'){
      sessionStorage.setItem (idimge , '_imagens/usd.png')
      localImagem.src = '_imagens/usd.png'
    }

  else if(dadosindex.bandeira == ''){
    if (dadosindex.sigla == 'EUR'){
      sessionStorage.setItem (idimge , '_imagens/eur.png')
      localImagem.src = '_imagens/eur.png'
    }
    else if (dadosindex.sigla == 'GBP'){
      sessionStorage.setItem (idimge , '_imagens/gbp.png')
      localImagem.src = '_imagens/gbp.png'
    }
    else{
      sessionStorage.setItem (idimge , '')
      localImagem.src = ''
    }
  }else{
    sessionStorage.setItem (idimge , dadosindex.bandeira)
    localImagem.src = dadosindex.bandeira
  }
}

function compararAtualizar(idtxt , idsel , idimg){
  let txt = removerAcentos(document.getElementById(idtxt).value.replace(/ /gi, '')).toUpperCase() //idtxt getElementById('ctxt1')
  let sel = document.getElementById(idsel) // idsel .getElementById('csel1')
  //let img = document.getElementById(idimg) // idimg
  sel.innerHTML = ''
  for (s of siglas){
    if (dados[txt].sigla == s){
      sel.innerHTML += `<option selected>${s}</option>`
      addImg(dados[txt] , idimg)

      /*
      if(dados[txt].bandeira == ''){
        if (dados[txt].sigla == 'USD'){
          sessionStorage.setItem (idimg , '_imagens/usd.png')
          img.src = '_imagens/usd.png'
        }
        else if (dados[txt].sigla == 'EUR'){
          sessionStorage.setItem (idimg , '_imagens/eur.png')
          img.src = '_imagens/eur.png'
        }
        else if (dados[txt].sigla == 'GBP'){
          sessionStorage.setItem (idimg , '_imagens/gbp.png')
          img.src = '_imagens/gbp.png'
        }
        else{
          sessionStorage.setItem (idimg , '')
          img.src = ''
        }
      }else{
        sessionStorage.setItem (idimg , dados[txt].bandeira)
        img.src = dados[txt].bandeira
      }
*/

    }else{
      sel.innerHTML += `<option>${s}</option>`
    }  
  }
  let input = document.getElementById(idtxt).value
  sessionStorage.setItem(idtxt , input)
  console.log(idtxt , input)
  atualizar()
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
        const resp = document.getElementById('resp')
        const idmf = document.getElementById('idmf')
        let datalist = document.getElementById('dlopc')
        let sel1 = document.getElementById('csel1')
        let sel2 = document.getElementById('csel2')
        let tempSiglas = []
        let tempData = []
        pais =  JSON.parse(ajax.responseText)
        //console.log(pais)
        for(p in pais){
          let ps = removerAcentos(p)
          let ms = removerAcentos(pais[p].moeda)
          dados[p.toUpperCase().replace(/ /gi, '')] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira , 'moeda':pais[p].moeda}
          dados[ps.toUpperCase().replace(/ /gi, '')] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira, 'moeda':pais[p].moeda }
          dados[pais[p].moeda.toUpperCase().replace(/ /gi, '')] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira , 'moeda':pais[p].moeda}
          dados[ms.toUpperCase().replace(/ /gi, '')] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira , 'moeda':pais[p].moeda}
          dados[pais[p].sigla] = {'sigla': pais[p].sigla , 'bandeira': pais[p].bandeira , 'moeda':pais[p].moeda}
          dados.ESTADOSUNIDOS = {'sigla': 'USD' , 'bandeira': '//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/22px-Flag_of_the_United_States.svg.png'}

          tempData.push(p)
          tempData.push(ps)
          tempData.push(pais[p].moeda)
          tempData.push(ms)

          /*
          datalist.innerHTML += `
          <option value="${p}"></option>
          <option value="${ps}"></option>
          <option value="${pais[p].moeda}"></option>
          <option value="${ms}"></option>
          `
          */
          tempSiglas.push(pais[p].sigla)             
        }
        let filtroData = [...semRepetir(tempData,true)]
        for(fd of filtroData){
          datalist.innerHTML += `<option value="${fd}"></option>`
        }
        siglas = [...semRepetir(tempSiglas ,true ) ]
    
        for(s of siglas){
          datalist.innerHTML += ` <option value="${s}"></option> `
          sel1.innerHTML += par[0] != s? `<option>${s}</option>` : `<option selected>${s}</option>`
          sel2.innerHTML += par[1] != s? `<option>${s}</option>` : `<option selected>${s}</option>`         
        }
        idmf.innerHTML = `${par[0]} (${dados[par[0]].moeda})`
        resp.innerHTML = '<p>equivale a</p>'
        resp.innerHTML += `<p><strong>${par[3]} ${par[1]} (${dados[par[1]].moeda})</strong></p>`
      }
    };
    ajax.onreadystatechange()
    ajax.send()
}

var load = ()=>{
  ajaxParMoeda()
  console.log(sessionStorage.getItem('img1') == null)
  console.log(sessionStorage.getItem('img1') == '')
  if (sessionStorage.getItem('img1') != null){
    document.getElementById('img1').src = sessionStorage.getItem('img1')
    document.getElementById('img2').src = sessionStorage.getItem('img2')
  }else{
    document.getElementById('img1').src = "//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/22px-Flag_of_the_United_States.svg.png"
    document.getElementById('img2').src = "//upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png"
  }
  
  //document.getElementById('img1').src = sessionStorage.getItem('img1')
  //document.getElementById('img2').src = sessionStorage.getItem('img2')
  
  
  document.getElementById('ctxt1').value = sessionStorage.getItem('ctxt1') != null ? sessionStorage.getItem('ctxt1') : ''
  document.getElementById('ctxt2').value = sessionStorage.getItem('ctxt2') != null != '' ? sessionStorage.getItem('ctxt2') : ''

  document.getElementById('ctxtq').value = sessionStorage.getItem('ctxtq') != null ? sessionStorage.getItem('ctxtq') : '1'
  

  console.log('load')
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

