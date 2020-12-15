// API key
const API_KEY = "pk.eyJ1IjoiZXJlc2RpdmluYSIsImEiOiJja2hwa2w4OWMwMHVsMnJvOGE3ZDIxdHlwIn0.PfbFm_UP5Rw2C66p0x9Eng";

// Creating initial map object
// Set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("mapid", {
    center: [45.52, -122.67],
    zoom: 5
  });
  
  // Adding a tile layer (the background map image) to the map
  // Used the addTo method to add objects to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


//   URL Link:
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

  d3.json(link, function(data) {
      earthquakes = data.features;
    //   console.log(earthquakes);
    for (var i=0; i < earthquakes.length;i++){
        coords = [earthquakes[i].geometry.coordinates[1],earthquakes[i].geometry.coordinates[0]];
        // console.log(coords)
        mag = earthquakes[i].properties.mag;
        place =  earthquakes[i].properties.place;
        // console.log("mag is ",mag);

        var color = "";
        color = "red";
            if (mag > 5) {
        }
        else if (mag > 4) {
          color = "orange";
        }
        else if (mag > 3) {
          color = "yellow";
        }
        else if (mag>2) {
          color = "green";
        }
        else if (mag >1){
            color = "blue";
        }
        else {
            color = "purple";
        }

        L.circle(coords, {
            fillOpacity: 0.75,
            color: "black",
            fillColor: color,
            // Adjust radius
            radius:  25000*mag
          }).bindPopup("<h3>" + place + "</h3>" + "<hr>" + "Magnitude:"+mag ).addTo(myMap);
        } 

        function getColor(d) {
          return d > 5 ? 'red' :
                 d > 4  ? 'orange' :
                 d > 3  ? 'yellow' :
                 d > 2  ? 'green' :
                 d > 1   ? 'blue' :
                 d > 0   ? 'purple' :
                 
                            '#FFEDA0';
      }


        var legend = L.control({position: 'bottomright'});
        
        legend.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 1,2,3,4,5],
          labels = [];
          // loop through the density intervals and generate a label with a colored square for each interval
          for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
           
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
          }
          return div;
        };
        
        legend.addTo(myMap);
      }
      
      )
