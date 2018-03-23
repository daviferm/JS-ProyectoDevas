

let INPUT = document.querySelectorAll("input");
const INFO = document.querySelector(".info");
const MAPA_BOTON = document.getElementById('botonMapa');
MAPA_BOTON.addEventListener('click', mostrarMapa);

document.querySelector('#formulario').addEventListener('submit', obtenetDatos);

const BARRIO = INPUT[0];
const MET = INPUT[1];

let lat=40.445493, long=-3.672232;
const parkimetros = [...items];

function obtenetDatos(e) {
  e.preventDefault();

	let barrio = BARRIO.value;
	let met = MET.value;
	let botonMap;
	let html;
	if(barrio.length < 2){
		BARRIO.style.borderColor = 'red';
	}else{
		BARRIO.style.borderColor = '';
		if(met.length < 3 || met.length > 4){
			MET.style.borderColor = 'red';
		}else if (met.length == 3) {
			MET.style.borderColor = '';
			met = 0 + MET.value;

			for(let i=0; i < parkimetros.length; i++){
				if( parkimetros[i].startsWith(barrio, 3) && parkimetros[i].endsWith(met) ){
					let mostrar = dataAlias[i];
					html = `<p>NÚMERO: ${mostrar.alias}</p>
					<p>BARRIO: ${mostrar.barrio}</p>
					<p>DIRECCIÓN: ${mostrar.direccion}</p>
					<p>FABRICANTE: ${mostrar.fabricante}</p>
					<p>latitud: ${mostrar.latitud}</p>
					<p>longitud: ${mostrar.longitud}</p>
					<button type="button" class="botonMapa">Mapa</button>`;
					botonMap = `<button type="button" class="botonMapa">Mapa</button>`
					INFO.className = 'info';
					INFO.innerHTML = html;
					INFO.style.display = 'block';
					lat = parseFloat(mostrar.latitud);
					long = parseFloat(mostrar.longitud);

						
					break;
				}else{
					INFO.classList.add('noEncontrado');
					html = `<h3>El número de Barrio</br>
					o Parkímetro es incorrecto...</h3>`;
					INFO.innerHTML = html;
				}
			}
		}
	}
}
function mostrarMapa () {
	document.getElementById('mapa').style.display = 'block';
	document.getElementById('map').style.display = 'block';
	initMap();
}

var map;
function initMap() {
	console.log("latitud: "+ lat);
	console.log("longitud: "+ long);
	var latlong = {lat: lat, lng: long};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: latlong,
    zoom: 16
  });
  var marker = new google.maps.Marker({
    position: latlong,
    map: map
  });
}






