/*
    Re: PROOFS
        JavaScript
        Map WebApp

        Author: Jonathan Milam Walters
        Date: 04 May 2016

    Filename: script.js
*/


// interpret contents in strict mode
"use strict";


// declare global variables
var waitForUser;


// set up page
function setUpPage() {

  // assign values to all divs child to #museums
  var buttons = document.querySelectorAll("#museums div");

  // register createMap() event listener for all buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", createMap, false);
  }
}


// add request for geolocation information to app
function geoTest() {

  // handle non-response for geolocation query
  waitForUser = setTimeout(fail, 10000);

  // check value of navigator.geolocation property
  // if truthy, call createMap();
  // else, call fail(), setting timeout for 10 seconds
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(createMap, fail, {timeout: 10000});
  } else {
    fail();
  }
}


// call when geolocation request succeeds
function createMap(position) {

  // declare local variables
  var Lat;
  var Lng;

  // kill waitForUser() if createMap() called successfully
  clearTimeout(waitForUser);

  // check coords property of position parameter for truthy value
  if (position.coords) { // if user coordinates ...

    // set value of Lat to latitude value of .coords property of position argument
    Lat = position.coords.latitude;
    // set value of Lng to longitude value of .coords property of position argument
    Lng = position.coords.longitude;

  } else { // else coordinates for selected city

    // initialize museum variable
    var museum = this.innerHTML;

    // iterate through destinations
    if (museum === "Pergamon Museum") {
      Lat = 52.51949;
      Lng = 13.39883;
    }
    if (museum === "Musée d'Orsay") {
      Lat = 48.86020;
      Lng = 2.32593;
    }
    if (museum === "Rothko Chapel") {
      Lat = 29.73782;
      Lng = -95.39574;
    }

    // set the innerHTML value of the element with the id value caption to the value of the museum variable
    document.getElementById("caption").innerHTML = museum;
  }

  // configure google maps options
  var mapOptions = {
    center: new google.maps.LatLng(Lat, Lng),
    zoom: 14
  }

  // initialize map instance
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}


// call when geolocation request fails
function fail() {
  console.log("Geolocation information not available or not authorized.");
  document.getElementById("map").innerHTML = "Unable to access your current location.";
}


// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);