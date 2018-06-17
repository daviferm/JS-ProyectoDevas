class UI {
    constructor(latlng, zoon) {
        //Inicializar y obtenet la propiedad de mapa
        this.mapa = new google.maps.Map(document.getElementById('map'), {
            center: latlng,
            zoom: zoon
        });
    }
    comoLlegar(latlng, zoon) {

        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1) ||
            (navigator.platform.indexOf("iPad") != -1)) {


            window.open("maps://maps.google.com/maps?daddr=" + latlng.lat + "," + latlng.lng + "&amp;ll=");
        } else {

            window.open("https://maps.google.com/maps?daddr=" + latlng.lat + "," + latlng.lng + "&amp;ll=");
        }
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

    mostrarPin(latlng, img) {
        let marcador = new google.maps.Marker({
            position: latlng,
            map: this.mapa,
            animation: google.maps.Animation.DROP,
            icon: img,
            title: 'Parkímetro'
        });
    }

}