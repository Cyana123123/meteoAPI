var mymap;
const getMap = (lattitude, longitude) => {
    if (mymap !== undefined) {
        mymap.remove();
    }
    mymap = L.map('mapid').setView([lattitude, longitude], 13)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 10,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoianVsaWVsb3JlbnRlIiwiYSI6ImNrbDdyZnkycTA4bmQyb3J2c3lzZ2R0a24ifQ.Krl7WVPujMReVX2cCi-Ivg'
    }).addTo(mymap);
}