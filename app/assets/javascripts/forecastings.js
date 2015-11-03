//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://coffeescript.org/


$(document).ready(function() {

	/*$('#putts').on('change', function() {
     // Place definition of calculateGIR() here.
  	});*/

 $("#btn_submit").on('click', function(){
 alert("asd");
	
    var geocoder =  new google.maps.Geocoder();
    var geoName = $("#forecasting_name").val();
    alert(geocoder);
    console.log(geocoder);
    geocoder.geocode( { 'address': geoName}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
    	var lat  = results[0].geometry.location.lat();
    	var long = results[0].geometry.location.lng();
    	var v = "location : " + lat + " " + long;
        $('#forecasting_latitude').val(lat);
        $('#forecasting_longitude').val(long);
        alert(v); 
      } else {
        alert("Something got wrong " + status);
      }
    });
});

});

