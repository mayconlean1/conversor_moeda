objetivo: Fazer um app que cacula um valor em uma determinada moeda, comparado a outra. funções : Criar um 'autocomplete' para ajuda ao usuário , utilizando um site na internet como banco de dados.
 
 ### 08/09/2020
 
Foi criado um script de um robô para buscar dados de países e moedas na internet , esse script cria um json com informações para ser usado em buscas posteriores, e também para os dados de 'autocomplete' para o usuário.
            
### 09/09/2020

Foi criado o html e importado o json com os dados do servidor para ele, foi acionado os dados no 'select' das siglas como 'options' filtrando as siglas repetidas , deixando as opções sem repetir;
foi implementado o 'autocomplete' na caixas de texto

### 10/09/2020

Foi corrigido do robo de 'WebScraping', para coletar os dados das imagens das bandeiras
Foi criado uma função para retirar acentos conhecidos e adicionado na pasta '/github'
Quando o input do texto é usado acionara filtros de acento e espaços , para acionar o select das siglas , junto com a imagem das bandeiras

### 11/09/2020

Foi filtrado as opções repetidas do banco de dados do 'input:text' e armazenado as informaçoes digitadas no 'sessionStorage' para nao sumir as informções

### 13/09/2020

Foi criado um módulo com os dois robos utilizados no app, e importado para o servidor

O Json('moeda_paises.json') de dados coletados pelo robo foi implementado , tambem atualizado o 'parMoeda.json' para ser acionado na URL principal 

Foi implementado o conversor , utilizando as entradas do usuário

Feito alguns estilos com CSS