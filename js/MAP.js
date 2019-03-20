class UI {
    constructor(latlng, zoon) {
        //Inicializar y obtenet la propiedad de mapa
        this.mapa = new google.maps.Map(document.getElementById('map'), {
            center: latlng,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            fullscreenControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: "greedy", //mover mapa con un dedo
            zoom: zoon
        });
        this.infoWindowActivo;

    }
    comoLlegar(latlng, zoon) {
        // https://www.google.es/maps/dir/mi+ubicacion/' + Latitud + ',' + Longitud +  '/


        // window.open("https://maps.google.com/maps?daddr=" + latlng.lat + "," + latlng.lng + "&amp;ll=");
        // window.open("https://www.google.es/maps/dir/mi+ubicacion/" + latlng.lat + "," + latlng.lng + "/");
        window.open(`https://maps.google.com/?daddr=${latlng.lat},${latlng.lng}`);

        // if ((navigator.platform.indexOf("iPhone") != -1) ||
        //     (navigator.platform.indexOf("iPod") != -1) ||
        //     (navigator.platform.indexOf("iPad") != -1)) {

        //     window.open("maps://maps.google.com/maps?daddr=" + latlng.lat + "," + latlng.lng + "&amp;ll=");
        // } else {

        // }


        /*La siguiente instrucción pregunta si damos permiso para acceder a nuestra
		posición GPS, y si es así accede a nuestras coordenadar.*/

        // if (navigator.geolocation) {
        // 	navigator.geolocation.getCurrentPosition(function(position) {
        // 		let pos = {
        // 			lat: position.coords.latitude,
        // 			lng: position.coords.longitude
        // 		};
        // 	});
        // } else {
        // 	alert("Necesitas habilitar el posicionamiento GPS.");
        // }
    }

    mostrarPin(latlng, img, alias, contenido) {
        let marker = new google.maps.Marker({
            position: latlng,
            map: this.mapa,
            animation: google.maps.Animation.DROP,
            icon: img,
            label: alias,
            title: 'Parkímetro'
        });
        let infowindow = new google.maps.InfoWindow({
            content: contenido
        });

        // Mostrar InfoWindow al hace click
        marker.addListener('click', (e) => {
            // Cerrar infoWindowActivo
            if (this.infoWindowActivo) {
                this.infoWindowActivo.close();
            }
            // Mostrarlo
            infowindow.open(this.mapa, marker);

            // Añadir un evento click al boton del infoWindow para marcarlo con hecho
            setTimeout(function() {

                let btnMap = document.getElementById('btnMap');

                btnMap.addEventListener('click', () => {

                    // window.open("https://www.google.es/maps/dir/mi+ubicacion/" + latlng.lat + "," + latlng.lng + "/");
                    window.open(`https://maps.google.com/?q=${latlng.lat},${latlng.lng}`);

                })
            }, 1000);

            //Asignar activo
            this.infoWindowActivo = infowindow;

        })


    }
    mostrarPosicion(latLng) {

        let marker = new google.maps.Marker({
            position: latLng,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8, //tamaño
                strokeColor: '#f00', //color del borde
                strokeWeight: 3, //grosor del borde
                fillColor: '#00f', //color de relleno
                fillOpacity: 1 // opacidad del relleno
            },
            map: this.mapa
        })

        return marker;

    }
}