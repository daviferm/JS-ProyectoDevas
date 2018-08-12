//Variables y constantes
const $plantillas = document.querySelectorAll('.flechaUp');
const cajaMet = document.querySelector('.inputMet');
const MAPA_BOTON = document.getElementById('botonMapa');
const $editarName = document.querySelectorAll('.edit');
const MOSTRAR_MAP = document.querySelectorAll('.posicionBtn');
const MAPA = document.getElementById('map');
const cerrarMapa = document.querySelector('.cerrarMapa');


//EventListenner
document.addEventListener('DOMContentLoaded', mostrarFichas);
document.addEventListener('DOMContentLoaded', localStorageload);
document.addEventListener('DOMContentLoaded', localStorageH2load);
document.addEventListener('DOMContentLoaded', actualizarContador);

document.querySelector('#formulario').addEventListener('submit', añadirMet);

for (let i = 0; i < MOSTRAR_MAP.length; i++) {
    MOSTRAR_MAP[i].addEventListener('click', mostrarPines);
}

cerrarMapa.addEventListener('click', ocultarMapa);
//Ciclo para activar las plantillas
for (let i = 0; i < $plantillas.length; i++) {
    $plantillas[i].addEventListener('click', activarPlantilla);
}
//Ciclo para añadir un addEventListener a la palabra 'edit'
$editarName.forEach((el) => {
    el.addEventListener('click', editarNombre);
})

//Clase para añadir listas de tareas
class Ficha {
    constructor(id, met) {
        this.lista = id;
        this.met = met;
        this.name = "lista_" + id;
        this.anadirLocalStorage(met);
    }
    anadirLocalStorage(met) {

        let items = this.obtenerDatosLocalStorage();
        items.push(met);

        localStorage.setItem(this.name, JSON.stringify(items));

    }
    obtenerDatosLocalStorage() {
        let elementos;
        let elem = this.name;
        // Revisar valores de localstorage
        if (localStorage.getItem(elem) === null) {
            elementos = [];
            console.log(elementos);
        } else {
            elementos = JSON.parse(localStorage.getItem(elem));
        }
        return elementos;
    }

}

//Funciones

function mostrarFichas(flecha) {

    flecha.className = 'ion-ios-arrow-up';

    let margin = 0;
    let zIndex = 1;
    $plantillas.forEach(function(el) {
        plantilla = el.parentElement.parentElement;
        plantilla.style.zIndex = `${zIndex}`;
        plantilla.style.marginTop = `${margin}px`;
        margin += 80;
        zIndex++;
    });
}
//Funcion para editar el nombre de la lista seleccionada
function editarNombre(event) {
    const tituloH2 = document.getElementById(targetaId).children[0].children[0].children[0];
    if (fichaActivada !== undefined) {
        const titulo = prompt("Escribe un título para la lista de mantenimiento..");

        if (titulo !== null && titulo.length > 0) {
            tituloH2.textContent = titulo;
            tituloH2.classList.add('efectoH2');
            guardarH2localStorage(titulo);
        }
    }
    setTimeout(() => {
        tituloH2.classList.remove('efectoH2');
    }, 500);
}

//Guardar h2 en localStorage
function guardarH2localStorage(titulo) {

    localStorage.setItem('tituloH2_' + targetaId, titulo);
}

//Cargar títulos de localStorag al recargar la página
function localStorageH2load() {
    let listH2tStorage = ['tituloH2_uno', 'tituloH2_dos', 'tituloH2_tres', 'tituloH2_cuatro', 'tituloH2_cinco'];
    listH2tStorage.forEach(function(el) {
        if (localStorage.getItem(el) !== null) {

            let id = el.substr(el.indexOf('_') + 1, el.length - 1);
            let Titulo = document.getElementById(id).children[0].children[0].children[0];
            Titulo.textContent = localStorage.getItem(el);
        }
    })
}
//Actualizar contador de li
function actualizarContador() {
    const contenido = document.querySelectorAll('.frontface');
    contenido.forEach(function(el) {
        const numeroMets = el.children.length;
        const contador = el.parentElement.previousElementSibling.children[2].children[0];

        contador.textContent = numeroMets;
        return contador;

    })
}

//Cargar los datos de localStorage
function localStorageload() {

    let listStorage = ['lista_uno', 'lista_dos', 'lista_tres', 'lista_cuatro', 'lista_cinco'];
    listStorage.forEach(function(el) {
        if (localStorage.getItem(el) !== null) {
            let list = JSON.parse(localStorage.getItem(el));
            list.forEach(function(item) {

                let id = el.substr(el.indexOf('_') + 1, el.length - 1);
                let plantilla = document.getElementById(id).children[1].children[0];

                crearLi(plantilla, item);
            })
        }
    })
}


//Borrar parkímetro de localStorage
function borrarDatoLocalStorage(met) {
    let storage = JSON.parse(localStorage.getItem('lista_' + targetaId));
    storage.forEach(function(el, index) {
        /*Por alguna razón aparece un espacion en el string del objeto 'met'
        y se ejecutra el método .trim() para quitarlo*/
        if (met.children[0].textContent.trim() == el.alias) {

            storage.splice(index, 1);
            console.log(el);
        }
    });

    localStorage.setItem('lista_' + targetaId, JSON.stringify(storage));

}



let fichaActivada, targetaId;

function activarPlantilla(el) {


    let elemento = el.target.parentElement.parentElement.parentElement;
    let flecha = el.target;

    flecha.classList.add('rotacion');

    if (fichaActivada !== undefined) {
        console.log("Tarjeta: " + targetaId);
        document.getElementById(targetaId).children[2].classList.remove('btnFooter');
        mostrarFichas(flecha);
        fichaActivada = undefined;
        targetaId = undefined;

    } else {
        targetaId = elemento.id;
        elemento.style.marginTop = '0px';

        // console.log(elemento.children[2]);
        let atributo;
        let margin = 650;
        for (let i = 0; i < $plantillas.length; i++) {
            atributo = $plantillas[i].parentElement.parentElement.getAttribute('data-key');
            if (atributo !== targetaId) {
                $plantillas[i].parentElement.parentElement.style.marginTop = `${margin}px`;
                margin += 2;
            }
        }
        // zIndex(el);
        fichaActivada = true;
        document.getElementById(targetaId).children[2].classList.add('btnFooter');
    }



}
/*
function zIndex(el) {
    let plantilla = el.target.parentElement;
    $plantillas.forEach(e => {
        e.style.zIndez = '0';
    });
    setTimeout(() => {
        plantilla.style.zIndex = '100';
    }, 300)
}*/

// Funcion para optener datos del formulario
function añadirMet(e) {
    e.preventDefault();

    const spinner = document.querySelector('.spinner');
    spinner.classList.add('animation');

    setTimeout(function() {

        const barrioSeleccionado = selectBarrio.options[selectBarrio.selectedIndex].value;
        let met = cajaMet.value;
        let botonMap;
        let html;

        if (met.length < 3 || met.length > 4) {
            cajaMet.style.borderColor = 'red';
            cajaMet.classList.add('rebote');
            setTimeout(function() {
                cajaMet.classList.remove('rebote');
            }, 1000);
        } else if (met.length == 3) {
            cajaMet.style.borderColor = '';
            met = 0 + cajaMet.value;

            anadirInfo(barrioSeleccionado, met);
        } else if (met.length === 4) {
            anadirInfo(barrioSeleccionado, met);
        }
        spinner.classList.remove('animation');
    }, 150);
}

//Añadir parkímetro a la lista seleccionada
function anadirInfo(barrio, met) {

    if (targetaId !== undefined) {

        let elem = baseDatos.findIndex(function(el) {
            //Devuelve el index del objeto en la variable "elem"
            return el.alias.startsWith(barrio, 3) && el.alias.endsWith(met);
        })

        if (elem !== -1) {

            const parkimetro = baseDatos[elem];
            const boleano = comprobarAlias(parkimetro);

            if (boleano !== true) {

                const plantilla = new Ficha(targetaId, parkimetro);
                const resultado = document.getElementById(targetaId).children[1].children[0];

                crearLi(resultado, parkimetro);
            } else {
                swal({
                        type: 'error',
                        title: 'Oops...',
                        text: `El parkímetro ${parkimetro.alias} ya está en la lista!!`
                    })
                    // swal("Ups!", `El parkímetro ${parkimetro.alias} ya está en la lista!`, "error");
            }

        } else {
            swal({
                type: 'info',
                title: 'Oops...',
                text: 'El parkímetro no se encuentra en la base de datos!',
            })
            console.error("El parkímetro no está en la base de datos!");
        }
    }
}
//Añadir li a la plantilla
function crearLi(plantilla, parkimetro) {

    // <input id="checkBox" type="checkbox">
    let html = `
      <label  id="alias">${parkimetro.alias}</label>
      <ion-icon id="borrar" name="trash"></ion-icon>
      `;
    let li = document.createElement('li');
    li.classList.add('liMet');
    li.innerHTML = html;
    plantilla.appendChild(li);

    //Actualizar contador de li
    actualizarContador();
    li.addEventListener('click', mostrarInformacion);


    // Pressure.set('#alias', {
    //     change: function(force, event) {
    //         const frontface = document.getElementById(targetaId).children[1].children[0];
    //         const backface = document.getElementById(targetaId).children[1].children[1];
    //         if (force > 0.9) {
    //             mostrarInfoMet(parkimetro);
    //         } else {
    //             backface.style.display = 'none';
    //             frontface.style.display = 'block';
    //         }
    //     },
    // }, { only: 'touch' });

}

//Mostrar mapa con los parkímetros seleccionados
function mostrarPines(e) {
    let elem = document.getElementById(targetaId).children[1].children[0].children;
    let elementos = [];

    for (let i = 0; i < elem.length; i++) {

        let numeroMet = elem[i].textContent.trim();

        const el = baseDatos.find(function(valor) {
            return valor.alias === numeroMet;
        })

        elementos.push(el);
    }

    let latitud = Number(elementos[0].latitud);
    let longitud = Number(elementos[0].longitud);

    let latlng = { lat: latitud, lng: longitud };
    let zoon = 15;
    let ui = new UI(latlng, zoon);

    elementos.forEach(function(elem) {

        let latitud = Number(elem.latitud);
        let longitud = Number(elem.longitud);

        let latlng = { lat: latitud, lng: longitud };


        ui.mostrarPin(latlng);

    })


    MAPA.classList.add('mostrarMap');
    cerrarMapa.classList.add('mostrarBtn');
}

//Ocultar Mapa
function ocultarMapa() {
    MAPA.classList.remove('mostrarMap');
    cerrarMapa.classList.remove('mostrarBtn');
}

//Mostrar información del parkímetro seleccionado en ordenadores
function mostrarInformacion(e) {
    let objMet;
    if (e.target.parentElement.parentElement.id == 'alias' || e.target.id == 'alias') {
        const alias = e.target.innerHTML;
        objMet = baseDatos.find(function(el) {
            return el.alias == alias;
        })
        mostrarInfoMet(objMet);
    }
    if (e.target.parentElement.parentElement.parentElement.id === 'borrar') {
        let alias = e.target.parentElement.parentElement.parentElement.previousElementSibling.textContent;
        const li = e.target.parentElement.parentElement.parentElement.parentElement;
        swal({
            title: `Estás seguro?`,
            text: `Se eliminará el parkímetro ${alias} de la lista!`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo!'
        }).then((result) => {
            if (result.value) {
                li.remove();
                borrarDatoLocalStorage(li);
                actualizarContador();
                swal(
                    'Eliminado!',
                    `El parkímetro ${alias} ha sido eliminado de la lista!`,
                    'success'
                )
            }
        })

    }
}

//Muestra un mensaje de confirmación para borrar un li
function confirmarBorrado(met, lista) {

}

//Funcion para mostrar la información del parkímetro seleccionado
function mostrarInfoMet(objMet) {
    const frontface = document.getElementById(targetaId).children[1].children[0];
    const backface = document.getElementById(targetaId).children[1].children[1];

    let html = `
    <section class="metBackface">
      <p>${objMet.alias}</p>
      <p>BARRIO: ${objMet.barrio}</p>
      <p>DIRECCIÓN: ${objMet.direccion}</p>
      <p>FABRICANTE: ${objMet.fabricante}</p>
      <p>TARIFA: ${objMet.tarifa}</p>
    </section>
    <div class="divBtnMap">
      <button type="button" class="btnMaps"><ion-icon name="car"></ion-icon><p>Como llegar</p></button>
    </div>
    <button type="button" class="btnInfo"> Salir </button>
  `;

    backface.innerHTML = html;

    let btnInfo = document.querySelector('.btnInfo');
    let btnMapa = document.querySelector('.btnMaps');
    let latitud = objMet.latitud;
    let longitud = objMet.longitud;

    backface.style.display = 'block';
    frontface.style.display = 'none';

    btnMapa.addEventListener('click', function() {

        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1) ||
            (navigator.platform.indexOf("iPad") != -1)) {


            window.open("maps://maps.google.com/maps?daddr=" + objMet.latitud + "," + objMet.longitud + "&amp;ll=");
        } else {

            window.open("https://maps.google.com/maps?daddr=" + objMet.latitud + "," + objMet.longitud + "&amp;ll=");
        }

    })
    btnInfo.addEventListener('click', function() {

        backface.style.display = 'none';
        frontface.style.display = 'block';

    })
}

//Comprobar si el parkímetro ha sido añadido
function comprobarAlias(el) {
    console.log(el);
    // const resultado = document.getElementById(targetaId).children[1].children[0];
    const resultado = JSON.parse(localStorage.getItem('lista_' + targetaId));

    // console.log(resultado);
    if (resultado !== null) {

        for (let i = 0; i < resultado.length; i++) {
            if (el.alias == resultado[i].alias) {
                return true;
                break;
            }
        }
    }
}

const selectBarrio = document.getElementById('barriosOption');

//Llenamos el listado de barrios
const barriosHTML = ["44 Guindalera", "45 Lista", "46 Castellana", "51 El Viso", "52 Prosperidad", "53 Ciudad Jardín", "54 Hispanoamérica", "55 Nueva España", "56 Castilla", "61 Bellas Vistas", "62 Cuatro Caminos", "63 Castillejos", "64 Almenara", "65 Valdeacederas", "66 Berruguete", "75 Rios Rosas", "76 Vallehermoso", "84 Pilar", "85 La Paz", "93 Ciudad Universitaria"];
const listaBarrios = [44, 45, 46, 51, 52, 53, 54, 55, 56, 61, 62, 63, 64, 65, 66, 75, 76, 84, 85, 93];

for (let i = 0; i < listaBarrios.length; i++) {
    let option = document.createElement('option');
    option.value = listaBarrios[i];
    option.innerHTML = barriosHTML[i];
    selectBarrio.appendChild(option);
}

const btnMap = document.querySelector('.flechaRigth');

btnMap.addEventListener('click', linkIndex);

function linkIndex() {
    window.location.href = '../index.html';
}