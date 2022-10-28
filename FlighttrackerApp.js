let searchResultEl = document.getElementById("searchresults");
//let x=2;
//export{x};

//console.log("l=" + lonmin);
let i = 1;

function createResult(res) {
    let a = res[0];
    let b = res[1];
    let c = res[2];
    let d = res[13];
    let e = res[5];
    let f = res[6];
    let g = res[9];
    // console.log(a);
    //console.log(b);
    //console.log(c);

    //1.div Element
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    searchResultEl.appendChild(resultItem);

    //2.TEXT
    let num = document.createElement("h1");

    num.textContent = "#Track No." + i;
    i = i + 1;
    num.classList.add("head1");
    resultItem.appendChild(num);
    let x = document.createElement("div");

    x.classList.add("box");
    x.classList.add("shadow-lg");
    resultItem.appendChild(x);
    let img = document.createElement("img");
    if (i % 2 === 1) {
        img.src = "https://airlinegeeks.com/wp-content/uploads/2020/06/Air-India-Boeing-787-8-Dreamliner-VT-ANL-3-25-19-William-Derrickson-scaled.jpg";
    } else {
        img.src = "https://c.ndtvimg.com/2019-04/ec4fnt5o_indigo-a320neo-ndtv_625x300_17_April_19.jpg";
    }
    img.classList.add("img1");
    x.appendChild(img);
    let text1 = document.createElement("p");
    text1.textContent = " ICAO no: " + a;
    text1.classList.add("y");
    x.appendChild(text1);
    let text2 = document.createElement("p");
    text2.textContent = "   Flight no: " + b;
    text2.classList.add("y");
    x.appendChild(text2);
    let text3 = document.createElement("p");
    text3.textContent = "   Country: " + c;
    text3.classList.add("y");
    x.appendChild(text3);
    let text4 = document.createElement("p");
    text4.textContent = "   Longitude: " + e;
    text4.classList.add("y");
    x.appendChild(text4);
    let text5 = document.createElement("p");
    text5.textContent = "   Lattitude: " + f;
    text5.classList.add("y");
    x.appendChild(text5);
    let text6 = document.createElement("p");
    text6.textContent = "   Velocity: " + g + " m/sec";
    text6.classList.add("y");
    x.appendChild(text6);
    let text7 = document.createElement("p");
    text6.textContent = "   Altitude (above sea level): " + d + " m";
    text6.classList.add("y");
    x.appendChild(text7);
    //3.break
    let breakEl = document.createElement("br");
    x.appendChild(breakEl);


}

function displayResults(results) {
    for (let res of results) {
        //let res=results[1];
        //console.log(res);
        localStorage.setItem("long",res[5]);
        localStorage.setItem("lat",res[6]);
        createResult(res);
    }
}

function get() {
    i = 1;
    searchResultEl.textContent = "";
    let long = document.getElementById("long");
    let lat = document.getElementById("lat");
    
    console.log(long.value);
    console.log(lat.value);
    let lonmin = long.value - 2;
    let lonmax = parseInt(long.value) + 2;
    let latmin = lat.value - 3;
    let latmax = parseInt(lat.value) + 2.3;
    

    let options = {
        method: "GET"
    }
    //"https://opensky-network.org/api/states/all?lamin="+latmin+9.10"&lomin="+lonmin+69.262"&lamax="+latmax+20.25"&lomax="+lonmax78.019";
    let url = "https://opensky-network.org/api/states/all?lamin=" + latmin + "&lomin=" + lonmin + "&lamax=" + latmax + "&lomax=" + lonmax;
    console.log(url);
    localStorage.setItem("url",url);
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log(data);
            let {
                time,
                states
            } = data;
            //var arr=states;
            //export{arr}
            console.log(states);
            displayResults(states);
            sessionStorage.setItem("states",JSON.stringify(states));
            localStorage.setItem("states",JSON.stringify(states));
            //location.href="stack.html";
            //var arr=states;
            //export{states}   ;

        });
}

// MAP CODE
function map(){
    function addMarkersToMap(map) {
        // icons
        // resize a larger PNG image to a specific size
        var parisPngIcon = new H.map.Icon("https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/444/aiga_departingflights-512.png", {size: {w: 32, h: 36}});
        var parisMarker = new H.map.Marker({
            lat: 18.8567,
            lng: 77.3508
          }, {icon: parisPngIcon});
          map.addObject(parisMarker);
          const platform = new H.service.Platform({
            app_id: 'DemoAppId01082013GAL',
            app_code: 'AJKnXv84fjrb0KIHawS0Tg',
            useCIT: true,
            useHTTPS: true
          });
      
          const maptypes = platform.createDefaultLayers();
      
          // Instantiate (and display) a map object:
          this.map = new H.Map(
            document.getElementById("mapContainer"),
            maptypes.normal.map, {
              zoom: 7,
              center: {
                lat: 16,
                lng: 78
              },
            },
          );
      
          var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      
          // Create the default UI components
          var ui = H.ui.UI.createDefault(this.map, maptypes, 'pt-BR');
      
          // Now use the map as required...
          addMarkersToMap(this.map);}
}