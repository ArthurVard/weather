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


$('#address').val('');
$('#address').focus();
$('#address').select();
$("input:text").focus(function() { $(this).select(); } );
//var addressPicker = new AddressPicker();

var addressPicker = new AddressPicker({autocompleteService: {types: ['(cities)']}});

$('#address').typeahead(null, {
  displayKey: 'description',
  source: addressPicker.ttAdapter()
});

 addressPicker.bindDefaultTypeaheadEvent($('#address'))
    $(addressPicker).on('addresspicker:selected', function (event, result) {
    //console.log(result)
      var html = ["Address: " + result.address()]
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

      ajaxCall();
    })

    $('#address').on('keypress', function (e) {

    	if(e.keyCode === 13){
            $('#address').select();
             $('#response1').html('');
             $('#forecast').html('');
             getPostal();
             ajaxCall();

        }
        //return false;
    });
  
    function ajaxCall(){

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
    };
	

function getPostal() {
	var postal = $("#address").val();
	console.log(postal);
	if (postal) {
	console.log(postal);

		$.getJSON("http://www.geonames.org/postalCodeLookupJSON?&callback=?", {postalcode: postal }, function(response) {
			console.log(response)
			if (response && response.postalcodes.length) {
				var html=[]
				response.postalcodes.forEach(function(p) {
					var url='/forecast/?lat='+p.lat+'&lng='+p.lng+'&name='+encodeURIComponent(p.placeName)
			        html.push('<a href='+ url +' data-remote="true" data-method="get">'+p.placeName+'('+p.lat+','+p.lng+')</a>');
      			})

				$('#response1').html( html.join('\n'));
			}
		})
	}
};


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

