

let MET = document.querySelector("input");
const INFO = document.querySelector(".info");
const MAPA_BOTON = document.getElementById('botonMapa');
const teclado = document.querySelector('.teclasNumero');
const selectBarrio = document.getElementById('barrio');


MAPA_BOTON.addEventListener('click', mostrarMapa);


document.querySelector('#formulario').addEventListener('submit', obtenetDatos);


var latlng = {lat: 40.4169473, lng: -3.7035285};
let zoon = 10;
let ui = new UI(latlng, zoon);

let lat, long;
const parkimetros = [...items];

function obtenetDatos(e) {
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
		}else if (met.length == 3) {
			MET.style.borderColor = '';
			met = 0 + MET.value;

			for(let i=0; i < parkimetros.length; i++){
				if( parkimetros[i].startsWith(barrioSeleccionado, 3) && parkimetros[i].endsWith(met) ){
					let mostrar = dataAlias[i];
					html = `<p>NÚMERO: ${mostrar.alias}</p>
					<p>BARRIO: ${mostrar.barrio}</p>
					<p>DIRECCIÓN: ${mostrar.direccion}</p>
					<p>FABRICANTE: ${mostrar.fabricante}</p>
					<p>TARIFA: ${mostrar.tarifa}</p>
					`;
					botonMap = `<button type="button" class="mostrarMapa">Mapa</button>`
					INFO.className = 'info';
					INFO.innerHTML = html;
					INFO.style.display = 'block';
					document.querySelector('#mapa').style.top = '15px';
					lat = Number( mostrar.latitud );
					lng = Number( mostrar.longitud );
					zoon = 17;
					latlng = {lat: lat, lng: lng};
					ui = new UI(latlng, zoon);
					ui.mostrarPin(latlng);

					break;
				}else{
					document.querySelector('#mapa').style.top = '20px';
					INFO.style.display = 'block';
					INFO.classList.add('noEncontrado');
					html = `<h3>El número de Barrio</br>
					o Parkímetro es incorrecto...</h3>`;
					INFO.innerHTML = html;
				}
			}
		}
		spinner.classList.remove('animation');
  }, 450);
}

function mostrarMapa () {
	document.getElementById('mapa').style.display = 'block';
	document.getElementById('map').style.display = 'block';
}



//Lenamos el listado de barrios
const listaBarrios = [44,45,46,51,52,53,54,55,56,61,62,63,64,65,66,75,76,84,85,93];

for(let i = 0; i < listaBarrios.length; i++){
  let option = document.createElement('option');
	option.value = listaBarrios[i];
	option.innerHTML = listaBarrios[i];
	selectBarrio.appendChild(option);
}

// const UL_BARRIO = document.getElementById('Barrios');
// const LISTA = document.getElementById('Lista_barrios');
// const MENU = document.querySelector('.lista');
// UL_BARRIO.addEventListener("focus", deplegarMenu);
// UL_BARRIO.addEventListener("blur", plegarMenu);


// function deplegarMenu () {
// 	MENU.style.height = '200px';
// 	LISTA.style.display = 'block';
// }
// function plegarMenu () {
// 	LISTA.style.display = 'none';
// }










