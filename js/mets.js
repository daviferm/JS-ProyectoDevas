
//Array de todos los barrios con sus nombres
const barriosHTML = ["44 Guindalera","45 Lista","46 Castellana","51 El Viso","52 Prosperidad","53 Ciudad Jardín","54 Hispanoamérica","55 Nueva España","56 Castilla","61 Bellas Vistas","62 Cuatro Caminos","63 Castillejos","64 Almenara","65 Valdeacederas","66 Berruguete","75 Rios Rosas","76 Vallehermoso","84 Pilar","85 La Paz","93 Ciudad Universitaria"];

//Array de los números de los barrios
const listaBarrios = [44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,75,76,84,85,93];

//Se declarran arrays para posteriormente llenarlos de los parkímetros que les correspondan
let array44 = [], array45 = [], array46 = [], array51 = [], array52 = [],
    array53 = [], array54 = [], array55 = [], array56 = [], array61 = [],
    array62 = [], array63 = [], array64 = [], array65 = [], array66 = [],
    array75 = [], array76 = [], array84 = [], array85 = [], array93 = [];

//Accedemos al elemento del DOM donde insertaremos el listado de prkímetros
const cuadroAlarmas = document.getElementById('CuadroAlarmas');
//Insertamos el nombre de cada barrio
let innerHtml = '';
for(let i = 0; i < barriosHTML.length; i++){
  let ul = `
    <ul class="nombreBarrio" onclick="mostrarMenu(${i})">
      <li><a herf="#"><p>${barriosHTML[i]}</p></a>
        <ul class="menus submenu${listaBarrios[i]}"></ul>
      </li>
    </ul>
  `;
  innerHtml += ul;
  cuadroAlarmas.innerHTML = innerHtml;
}

const $ul = document.getElementsByTagName('ul');
const arrUl = Array.from($ul);
const $submenu = [];
for( let i = 0; i < arrUl.length; i++){
  if(i % 2 !== 0){
    $submenu.push(arrUl[i]);
  }
}


//Ciclo para repartir los parkímetros en arrays por barrios
for(let i = 0; i < baseDatos.length; i++){
  let barrio = baseDatos[i].barrio;
  if( barrio.startsWith("44") ){
    
    array44.push(baseDatos[i].alias);

  }else if(barrio.startsWith("45")){

    array45.push(baseDatos[i].alias)
  }else if(barrio.startsWith("46")){

    array46.push(baseDatos[i].alias)
  }else if(barrio.startsWith("51")){

    array51.push(baseDatos[i].alias)
  } 
}

// Función para ordenar los parkímetros por ordén
function ordenarArray(array){
  let mapped = array.map(function(el, i) {
    return { index: i, value: el.slice( (el.length - 4), el.length) };
  });
  
  mapped.sort(function(a, b) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  array = mapped.map(function(el){
    return array[el.index];
  });
  return array;
}

//Funcion para insertar la lista de parkímetros en el submenú
function insertarMets(element, index){
  for(let i = 0; i < element.length; i++){
    const li = document.createElement('li');
    li.innerHTML = `<p> ${element[i]} </p>`;
    $submenu[index].appendChild(li);
  }
  
}
// Insertamos lo parkímetros en cada lista de barrio
const innerBarrio44 = ordenarArray(array44);
insertarMets(innerBarrio44, 0);
const innerBarrio45 = ordenarArray(array45);
insertarMets(innerBarrio45, 1);
const innerBarrio46 = ordenarArray(array46);
insertarMets(innerBarrio46, 2);
const innerBarrio51 = ordenarArray(array51);
insertarMets(innerBarrio51, 3);

function mostrarMenu(index){
  if($submenu[index].style.display == 'block'){
    $submenu[index].style.display = 'none';
  }else{
    $submenu[index].style.display = 'block'
  }
}

