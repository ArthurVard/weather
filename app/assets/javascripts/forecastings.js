//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://coffeescript.org/

function displayResults(result, div) {
    html = ["Address: " + result.address()]
    html.push("Latitude: " + result.lat())
    html.push("Longitude: " + result.lng())
    html.push("Long names:")
    result.addressTypes().forEach(function(type) {
      html.push("  " + type + ": " + result.nameForType(type))
    })
    html.push("Short names:")
    result.addressTypes().forEach(function(type) {
      html.push("  " + type + ": " + result.nameForType(type, true))
    })
    div.html( html.join('\n'));
  }

$(document).ready(function() {


$('#address').val('')
$("input:text").focus(function() { $(this).select(); } );
//var addressPicker = new AddressPicker();

var addressPicker = new AddressPicker({autocompleteService: {types: ['(cities)']}});

$('#address').typeahead(null, {
  displayKey: 'description',
  source: addressPicker.ttAdapter()
});

 addressPicker.bindDefaultTypeaheadEvent($('#address'))
    $(addressPicker).on('addresspicker:selected', function (event, result) {
    console.log(result)
      html = ["Address: " + result.address()]
      html.push("Latitude: " + result.lat())
      html.push("Longitude: " + result.lng())
      html.push("Long names:")
      result.addressTypes().forEach(function(type) {
        html.push("  " + type + ": " + result.nameForType(type))
      })
      html.push("Short names:")
      result.addressTypes().forEach(function(type) {
        html.push("  " + type + ": " + result.nameForType(type, true))
      })
      $('#response1').html( html.join('\n'))

      $.ajax({

				type: "GET",
				url: "/forecast/?search="+$('#address').val(),
				success: function(data){
					$('#address').select()
				},

				error: function (request, status, error) {
        			alert(error);
        			}
				});
    })
  

	

 $("#some_btn_submit").on('click', function(){
 alert("asd");
	
    var geocoder =  new google.maps.Geocoder();
    var geoName = $("#address").val();
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

