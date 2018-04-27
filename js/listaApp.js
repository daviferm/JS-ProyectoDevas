
const $plantillas = document.querySelectorAll('.lista');

document.addEventListener('DOMContentLoaded', mostrarFichas)

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

console.log(listaUno);
console.log(listaDos);
console.log(listaTres);
console.log(listaCuatro);
console.log(listaCinco);

function mostrarFichas(){
  let margin = 0;
  let zIndex = 0;
  $plantillas.forEach(function(el){
    el.style.zIndex = `${zIndex}`;
    el.style.marginTop = `${margin}px`;
    margin += 80;
    zIndex ++;
  });
}

//Funciones


let fichaActivada, targeta;
function activarPlantilla(el){
  if(fichaActivada !== undefined){
    mostrarFichas();
    fichaActivada = undefined;
    targeta = undefined;
  }else{
    targeta = el.target.parentElement.id;
    el.target.parentElement.style.marginTop = '0px';
    let plantilla = el.target.parentElement.getAttribute('data-key');
    let atributo;
    let margin = 650;
    for(let i = 0; i < $plantillas.length; i++){
      atributo = $plantillas[i].getAttribute('data-key');
      if(atributo !== plantilla){
        $plantillas[i].style.marginTop = `${margin}px`;
        margin += 2;
      } 
    }
    zIndex(el);
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

