var pais= ''
var par = ''
var siglas = []

function atualizar(s){
    let form = document.getElementsByName(s)
    console.log(form)
    document.forms[s].submit()
}

function teste(){
    let sel1 = document.getElementById(par[0])
    sel1.selected = true
    console.log(document.getElementById(par[1]))   
}

const ajaxParMoeda = ()=>{
  let ajax = new XMLHttpRequest();
    ajax.open('GET' ,'parMoeda.json')
    ajax.onreadystatechange = async function(){
      if (ajax.readyState === 4 && ajax.status === 200){
        par =  JSON.parse(ajax.responseText)
        await ajaxMoedaPais()
      }
    };
    ajax.onreadystatechange()
    ajax.send()
}

const ajaxMoedaPais = async () => {
  let ajax = new XMLHttpRequest();
    ajax.open('GET' , 'moeda_paises.json')
    ajax.onreadystatechange = function(){
      
      if (ajax.readyState === 4 && ajax.status === 200){
        
        let sel1 = document.getElementById('csel1')
        let sel2 = document.getElementById('csel2')
        let tempSiglas = []
        pais =  JSON.parse(ajax.responseText)
        for(p in pais){
          tempSiglas.push(pais[p].sigla)             
        }
        siglas = [...semRepetir(tempSiglas ,true ) ]
    
        for(s of siglas){
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


console.log('foi')
