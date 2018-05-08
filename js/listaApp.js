
const $plantillas = document.querySelectorAll('.flechaUp');
const cajaMet = document.querySelector('.inputMet');
const MAPA_BOTON = document.getElementById('botonMapa');
// const cajaMet = document.querySelector("input");

document.addEventListener('DOMContentLoaded', mostrarFichas);
document.addEventListener('DOMContentLoaded', localStorageload);

document.querySelector('#formulario').addEventListener('submit', añadirMet);

//Ciclo para activar las plantillas
for(let i = 0; i < $plantillas.length; i++){
  $plantillas[i].addEventListener('click', activarPlantilla);
}

//Clase para añadir listas de tareas
class Ficha {
  constructor(id, met){
    this.lista = id;
    this.met = met;
    this.name = "lista_"+id;
    this.anadirLocalStorage(met);
  }
  anadirLocalStorage(met){
    
    let items = this.obtenerDatosLocalStorage();
    items.push(met);

    localStorage.setItem(this.name, JSON.stringify(items));
  }
  obtenerDatosLocalStorage() {
    let elementos;
    let elem = this.name;
    // Revisar valores de localstorage
    if(localStorage.getItem( elem ) === null) {
        elementos = [];
        console.log(elementos);
    } else {
        elementos = JSON.parse(localStorage.getItem(elem) );
    }
    return elementos;
  }
  
}



//Funciones

function mostrarFichas(flecha){

  for(let i = 0; i < flecha.length; i++){
    flecha[i].classList.remove('rotacion');
  }
  
  let margin = 0;
  let zIndex = 1;
  $plantillas.forEach(function(el){
    plantilla = el.parentElement.parentElement;
    plantilla.style.zIndex = `${zIndex}`;
    plantilla.style.marginTop = `${margin}px`;
    margin += 80;
    zIndex ++;
  });
}

//Cargar los datos de localStorage
function localStorageload(){
  
  let listStorage = ['lista_uno', 'lista_dos', 'lista_tres', 'lista_cuatro', 'lista_cinco'];
  listStorage.forEach(function(el){
    if(localStorage.getItem(el) !== null){
      let list = JSON.parse(localStorage.getItem(el));
      list.forEach(function(item){
        
        let id = el.substr( el.indexOf('_') + 1 , el.length - 1);
        let plantilla = document.getElementById(id).children[1].children[0];

        crearLi(plantilla, item);
      })
    }
  })
}


//Borrar parkímetro de localStorage
function borrarDatoLocalStorage(met) {
  let storage = JSON.parse(localStorage.getItem('lista_'+targetaId));
  storage.forEach(function(el, index){
    /*Por alguna razón aparece un espacion en el string del objeto 'met'
    y se ejecutra el método .trim() para quitarlo*/
    if(met.children[0].textContent.trim() == el.alias){

      storage.splice(index, 1);
      console.log(el);
    }
  });

  localStorage.setItem('lista_'+targetaId, JSON.stringify(storage));

}



let fichaActivada, targetaId;
function activarPlantilla(el){

  let elemento = el.target.parentElement.parentElement.parentElement;
  let flecha = el.target.parentElement.children;

  for(let i = 0; i < flecha.length; i++){
    flecha[i].classList.add('rotacion');
  }

  if(fichaActivada !== undefined){
    mostrarFichas(flecha);
    fichaActivada = undefined;
    targetaId = undefined;
    console.log("Tarjeta: " + targetaId);
  }else{
    targetaId = elemento.id;
    console.log("Tarjeta: " + targetaId);
    elemento.style.marginTop = '0px';
    // let plantilla = elemento.getAttribute('data-key');
    let atributo;
    let margin = 650;
    for(let i = 0; i < $plantillas.length; i++){
      atributo = $plantillas[i].parentElement.parentElement.getAttribute('data-key');
      if(atributo !== targetaId){
        $plantillas[i].parentElement.parentElement.style.marginTop = `${margin}px`;
        margin += 2;
      } 
    }
    // zIndex(el);
    fichaActivada = true;
  }
}
function zIndex(el){
  let plantilla = el.target.parentElement;
  $plantillas.forEach( e => {
    e.style.zIndez = '0';
  });
  setTimeout( () =>{
    plantilla.style.zIndex = '100';
  }, 300)
}
// Funcion para optener datos del formulario

function añadirMet(e){
  e.preventDefault();

  const spinner = document.querySelector('.spinner');
  spinner.classList.add('animation');

  setTimeout(function(){

		const barrioSeleccionado = selectBarrio.options[selectBarrio.selectedIndex].value;
		let met = cajaMet.value;
		let botonMap;
		let html;
		
		if(met.length < 3 || met.length > 4){
			cajaMet.style.borderColor = 'red';
			cajaMet.classList.add('rebote');
			setTimeout(function(){
				cajaMet.classList.remove('rebote');
			}, 1000);
		}else if (met.length == 3) {
			cajaMet.style.borderColor = '';
      met = 0 + cajaMet.value;
			cajaMet.style.borderColor = '';
      met = 0 + cajaMet.value;
      
      anadirInfo(barrioSeleccionado, met);
		}else if(met.length === 4){
      anadirInfo(barrioSeleccionado, met);
		}
		spinner.classList.remove('animation');
  }, 150);
}

//Añadir parkímetro a la lista seleccionada
function anadirInfo(barrio, met){
  
  if(targetaId !== undefined){

    let elem = baseDatos.findIndex(function(el){
      
      return el.alias.startsWith(barrio, 3) && el.alias.endsWith(met);
      //Devuelve el index del objeto en la variable "elem"
    })

    if(elem !== -1){

      const parkimetro = baseDatos[elem];
      const boleano = comprobarAlias(parkimetro);
      
      if(boleano !== true){
        
        const plantilla = new Ficha(targetaId, parkimetro);
        const resultado = document.getElementById(targetaId).children[1].children[0];
        
        crearLi(resultado, parkimetro);
      }else{
        alert("El parkímetro ya está en la lista");
      }

    } else {
      alert("El parkímetro no se encuentra en la base de datos!");
      console.error("El parkímetro no está en la base de datos!");
    }
  } 
}
//Añadir li a la plantilla
function crearLi(plantilla, parkimetro){
  
  // <input id="checkBox" type="checkbox">
  let html = `
  <label  id="alias" for"checkBox">${parkimetro.alias}</label>
  <span class="equix">X</span>
  `;
  let li = document.createElement('li');
  li.classList.add('liMet');
  li.innerHTML = html;
  plantilla.appendChild(li);
  
  /*Se comprueba si se accede a traves de un movil para cambiar el 
  evento 'click' por el evento 'touchstart'*/
  if(isMobile.mobilecheck()){
    li.addEventListener('touchstart', function(e){
      if(e.targetTouches[0].target.className == 'equix'){
        let li = e.targetTouches[0].target.parentElement;
        li.remove();
        borrarDatoLocalStorage(li);
      }
    });
  } else {
    li.addEventListener('click', mostrarInformacion);
  }

  li.addEventListener('click', mostrarInformacion);
}

//Mostrar información del parkímetro seleccionado
function mostrarInformacion(e){
  if(e.target.id == 'alias'){
    const num = e.target;
    console.log( num.parentElement);
  }
  if(e.target.textContent === 'X'){
    const li = e.target.parentElement.parentElement.parentElement;

    if(targetaId !== undefined){
      
      li.remove();
      // console.log(e.currentTarget);
      borrarDatoLocalStorage(li);
    }

  }
}

//Comprobar si el parkímetro ha sido añadido
function comprobarAlias(el){
  console.log(el);
  // const resultado = document.getElementById(targetaId).children[1].children[0];
  const resultado = JSON.parse(localStorage.getItem('lista_'+targetaId));
  
  // console.log(resultado);
  if(resultado !== null){

    for( let i = 0; i < resultado.length; i++){
      if(el.alias == resultado[i].alias){
        return true;
        break;
      }
    }
  }
}

const selectBarrio = document.getElementById('barriosOption');

//Llenamos el listado de barrios
const barriosHTML = ["44 Guindalera","45 Lista","46 Castellana","51 El Viso","52 Prosperidad","53 Ciudad Jardín","54 Hispanoamérica","55 Nueva España","56 Castilla","61 Bellas Vistas","62 Cuatro Caminos","63 Castillejos","64 Almenara","65 Valdeacederas","66 Berruguete","75 Rios Rosas","76 Vallehermoso","84 Pilar","85 La Paz","93 Ciudad Universitaria"];
const listaBarrios = [44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,75,76,84,85,93];

for(let i = 0; i < listaBarrios.length; i++){
  let option = document.createElement('option');
	option.value = listaBarrios[i];
	option.innerHTML = barriosHTML[i];
	selectBarrio.appendChild(option);
}

