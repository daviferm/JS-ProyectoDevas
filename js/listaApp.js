
const $plantillas = document.querySelectorAll('.flechaUp');
const cajaMet = document.querySelector('.inputMet');
const MAPA_BOTON = document.getElementById('botonMapa');
const MET = document.querySelector("input");

document.addEventListener('DOMContentLoaded', mostrarFichas);

document.querySelector('#formulario').addEventListener('submit', añadirMet);

for(let i = 0; i < $plantillas.length; i++){
  $plantillas[i].addEventListener('click', activarPlantilla);
}

class Ficha {
  constructor(num){
    this.lista = num;
  }
  
}
const listaUno = new Ficha(uno);
const listaDos = new Ficha(dos);
const listaTres = new Ficha(tres);
const listaCuatro = new Ficha(cuatro);
const listaCinco = new Ficha(cinco);


//Funciones

function mostrarFichas(flecha){

  for(let i = 0; i < flecha.length; i++){
    flecha[i].classList.remove('rotacion');
  }
  
  let margin = 0;
  let zIndex = 0;
  $plantillas.forEach(function(el){
    plantilla = el.parentElement;
    plantilla.style.zIndex = `${zIndex}`;
    plantilla.style.marginTop = `${margin}px`;
    margin += 80;
    zIndex ++;
  });
}



let fichaActivada, targeta;
function activarPlantilla(el){
  let elemento = el.target.parentElement.parentElement;
  let flecha = el.target.parentElement.children;

  for(let i = 0; i < flecha.length; i++){
    flecha[i].classList.add('rotacion');
  }

  if(fichaActivada !== undefined){
    mostrarFichas(flecha);
    fichaActivada = undefined;
    targeta = undefined;
    console.log("Tarjeta: " + targeta);
  }else{
    targeta = elemento.id;
    console.log("Tarjeta: " + targeta);
    elemento.style.marginTop = '0px';
    let plantilla = elemento.getAttribute('data-key');
    let atributo;
    let margin = 650;
    for(let i = 0; i < $plantillas.length; i++){
      atributo = $plantillas[i].parentElement.getAttribute('data-key');
      if(atributo !== plantilla){
        $plantillas[i].parentElement.style.marginTop = `${margin}px`;
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
		let met = MET.value;
		let botonMap;
		let html;
		
		if(met.length < 3 || met.length > 4){
			MET.style.borderColor = 'red';
			cajaMet.classList.add('rebote');
			setTimeout(function(){
				cajaMet.classList.remove('rebote');
			}, 1000);
		}else if (met.length == 3) {
			MET.style.borderColor = '';
      met = 0 + MET.value;
      anadirInfo(barrioSeleccionado, met);
		}else if(met.length === 4){
      anadirInfo(barrioSeleccionado, met);
		}
		spinner.classList.remove('animation');
  }, 150);
}

//Añadir parkímetro a la lista seleccionada
function anadirInfo(barrio, met){
  if(targeta !== undefined){

    let elem = baseDatos.find(function(el){
      return el.alias.startsWith(barrio, 3) && el.alias.endsWith(met)
    })
    if(elem !== undefined){
      console.log("Plantilla: " + targeta);
      console.log("Parkímetro: " + elem.alias);
    } else {
      console.error(elem);
    }
    
  } 
}

const selectBarrio = document.getElementById('barriosOption');

//Lenamos el listado de barrios
const barriosHTML = ["44 Guindalera","45 Lista","46 Castellana","51 El Viso","52 Prosperidad","53 Ciudad Jardín","54 Hispanoamérica","55 Nueva España","56 Castilla","61 Bellas Vistas","62 Cuatro Caminos","63 Castillejos","64 Almenara","65 Valdeacederas","66 Berruguete","75 Rios Rosas","76 Vallehermoso","84 Pilar","85 La Paz","93 Ciudad Universitaria"];
const listaBarrios = [44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,75,76,84,85,93];

for(let i = 0; i < listaBarrios.length; i++){
  let option = document.createElement('option');
	option.value = listaBarrios[i];
	option.innerHTML = barriosHTML[i];
	selectBarrio.appendChild(option);
}

