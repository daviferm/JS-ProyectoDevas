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
            gestureHandling: "greedy",
            zoom: zoon
        });
    }
    comoLlegar(latlng, zoon) {
        // https://www.google.es/maps/dir/mi+ubicacion/' + Latitud + ',' + Longitud +  '/


        // window.open("https://maps.google.com/maps?daddr=" + latlng.lat + "," + latlng.lng + "&amp;ll=");
        window.open("https://www.google.es/maps/dir/mi+ubicacion/" + latlng.lat + "," + latlng.lng + "/");

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

    mostrarPin(latlng, img, alias) {
        let marcador = new google.maps.Marker({
            position: latlng,
            map: this.mapa,
            animation: google.maps.Animation.DROP,
            icon: img,
            label: alias,
            title: 'Parkímetro'
        });

    }
    mostrarPosicion(latLng) {

        let marker = new google.maps.Marker({
            position: latLng,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10, //tamaño
                strokeColor: '#f00', //color del borde
                strokeWeight: 5, //grosor del borde
                fillColor: '#00f', //color de relleno
                fillOpacity: 1 // opacidad del relleno
            },
            map: this.mapa
        })

    }
}