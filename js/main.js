let MET = document.querySelector("input"),
    cajaMet = document.querySelector('.inputMet'),
    INFO = document.querySelector(".info"),
    // MAPA_BOTON = document.getElementById('botonMapa'),
    selectBarrio = document.getElementById('barrio'),
    $miPosicion = document.getElementById('posicionBtn'),
    $mostrarInfo = document.getElementById('mostrarInfo'),
    $iconCerrarInfo = document.getElementById('cerrar-info'),
    $iconInfo = document.getElementById('icon-info'),
    $nuevaWeb = document.querySelector('.nuevaweb'),
    $closeFooter = document.getElementById('close');

$miPosicion.addEventListener('click', navegacion);

$mostrarInfo.addEventListener('click', mostrarInformacion);

$closeFooter.addEventListener('click', cerrarFooter);

let cajaInfo = true;

document.querySelector('#formulario').addEventListener('submit', obtenetDatos);


function cerrarFooter() {
    console.log('Cerrar footer...');

    $nuevaWeb.classList.add('esconder');
    // document.addEventListener('animationend', function() {
    //     $nuevaWeb.classList.remove('esconder');
    // })
}

var latlng = { lat: 40.4169473, lng: -3.7035285 };
let zoon = 10;
let ui = new UI(latlng, zoon);
let lat, long;

//Comprobar datos del formulario y mostrarlos en pantalla
function obtenetDatos(e) {
    e.preventDefault();
    const spinner = document.querySelector('.spinner');
    spinner.classList.add('animation');

    setTimeout(function() {

        const barrioSeleccionado = selectBarrio.options[selectBarrio.selectedIndex].value;
        let met = MET.value;
        let html;

        if (met.length < 3 || met.length > 4) {
            MET.style.borderColor = 'red';
            cajaMet.classList.add('rebote');
            setTimeout(function() {
                cajaMet.classList.remove('rebote');
            }, 1000);
        } else if (met.length == 3) {
            MET.style.borderColor = '';
            met = 0 + MET.value;
            mostrarInfo(barrioSeleccionado, met);
        } else if (met.length === 4) {
            mostrarInfo(barrioSeleccionado, met);
        }
        spinner.classList.remove('animation');
    }, 150);
}

//Función para mostrar la información del parkímetro
async function mostrarInfo(barrioSeleccionado, met) {

    let data = await fetch('https://app-utedevas.firebaseio.com/parkimetros.json')
        .then(async function(res) {
            let respuesta = await res.json();
            console.log(respuesta);
            return respuesta;
        });

    // let data = await fetch('./data/data.json')
    //     .then(async function(res) {
    //         let respuesta = await res.json();
    //         return respuesta;
    //     })

    let baseDatosMets = data;


    for (let i = 0; i < baseDatosMets.length; i++) {
        if (baseDatosMets[i].alias.startsWith(barrioSeleccionado, 3) && baseDatosMets[i].alias.endsWith(met)) {
            console.log(baseDatosMets[i]);

            document.querySelector('footer').classList.add('btnFooter');

            let mostrar = baseDatosMets[i];
            html = `<p>NÚMERO: ${mostrar.alias}</p>
			<p>BARRIO: ${mostrar.barrio}</p>
			<p>DIRECCIÓN: <span class="span">${mostrar.direccion}</span></p>
			<p>FABRICANTE: ${mostrar.fabricante}</p>
			`;
            // INFO.style.display = 'none';
            $mostrarInfo.style.display = 'block';


            if (baseDatosMets[i].estado === 'desmontada') {
                html = `<p>NÚMERO: ${mostrar.alias}</p>
                    <p>BARRIO: ${mostrar.barrio}</p>
                    <p>DIRECCIÓN: <span class="span">${mostrar.direccion}</span></p>
                    <p class="estado">ESTADO: ${mostrar.estado.toUpperCase()}</p>
                    `;
                INFO.classList.add('infoDesmontada');
            } else {
                INFO.style.background = 'rgba(0, 0, 0, .5)';
            }
            INFO.innerHTML = html;
            INFO.style.display = 'none';
            // document.querySelector('#mapa').style.top = '15px';
            lat = Number(mostrar.latitud);
            lng = Number(mostrar.longitud);
            let img;
            if (baseDatosMets[i].alias.startsWith(1, 5)) {
                img = 'https://daviferm.github.io/ProyectoDevas/img/parkare.png';
            } else if (baseDatosMets[i].alias.startsWith(2, 5)) {
                img = 'https://daviferm.github.io/ProyectoDevas/img/wispark.png';
            } else {
                img = 'https://daviferm.github.io/ProyectoDevas/img/parkeon.png';
            }
            zoon = 17;
            latlng = { lat: lat, lng: lng };
            ui = new UI(latlng, zoon);
            ui.mostrarPin(latlng, img);

            //Mostrar mi posición GPS
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    let latLng = {
                        lat: position.lat,
                        lng: position.lng
                    }
                    let miPosicion = ui.mostrarPosicion(latLng);
                    if (!miPosicion) {

                    }

                });

            } else {
                throw error = new Error('Necesitas habilitar GPS!');
            }

            window.scrollBy(0, 0);
            break;
        } else {

            document.querySelector('footer').classList.remove('btnFooter');
            INFO.style.display = 'block';
            INFO.classList.add('noEncontrado');
            html = `<h3>El número de Barrio</br>
            o Parkímetro es incorrecto...</h3>`;
            INFO.innerHTML = html;
        }
    }
}

//mostrar y ocultar información del parquímetro
function mostrarInformacion() {
    if (cajaInfo) {

        INFO.style.display = 'block';
        $iconInfo.style.display = 'none';
        $iconCerrarInfo.style.display = 'block';
        cajaInfo = !cajaInfo;

    } else {

        INFO.style.display = 'none';
        $iconInfo.style.display = 'block';
        $iconCerrarInfo.style.display = 'none';
        cajaInfo = !cajaInfo;

    }
}


function navegacion() {

    ui.comoLlegar(latlng, zoon);
}


//Lenamos el listado de barrios
const barriosHTML = ["44 Guindalera", "45 Lista", "46 Castellana", "51 El Viso", "52 Prosperidad", "53 Ciudad Jardín", "54 Hispanoamérica", "55 Nueva España", "56 Castilla", "61 Bellas Vistas", "62 Cuatro Caminos", "63 Castillejos", "64 Almenara", "65 Valdeacederas", "66 Berruguete", "75 Rios Rosas", "76 Vallehermoso", "84 Pilar", "85 La Paz", "93 Ciudad Universitaria"];
const listaBarrios = [44, 45, 46, 51, 52, 53, 54, 55, 56, 61, 62, 63, 64, 65, 66, 75, 76, 84, 85, 93];

for (let i = 0; i < listaBarrios.length; i++) {
    let option = document.createElement('option');
    option.value = listaBarrios[i];
    option.innerHTML = barriosHTML[i];
    selectBarrio.appendChild(option);
}

const LINK = document.querySelector('.flecha');

LINK.addEventListener('click', cambiarPantalla);


// Función para cambiar de app
function cambiarPantalla() {
    window.location.href = 'links/listas.html';
}