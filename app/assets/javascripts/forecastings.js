//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://coffeescript.org/



$(document).ready(function() {



$('#postalcodes').hide();
$('#debug').hide();
$('#details').hide();
$('#address').focus();
$('#address').select();
$("input:text").focus(function() { $(this).select(); } );

var addressPicker = new AddressPicker({autocompleteService: {types: ['(cities)']}});

$('#address').typeahead(null, {
  displayKey: 'description',
  source: addressPicker.ttAdapter()
});

var tabIds = ['#postalcodes', '#debug', '#details'] 

$('#postals_link').on('click', function(){
   $('#debug').hide();
   $('#details').hide();
   $('#postalcodes').toggle();  
});

$('#details_link').on('click', function(){
   $('#postalcodes').hide();
   $('#debug').hide();
   $('#details').toggle();  
});

$('#debug_link').on('click', function(){
 $('#postalcodes').hide();
 $('#details').hide();
 $('#debug').toggle();  
})

 addressPicker.bindDefaultTypeaheadEvent($('#address'))
    $(addressPicker).on('addresspicker:selected', function (event, result) {
    //console.log(result)
      /*var html = ["Address: " + result.address()]
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
      $('#debug').html( html.join('\n'))*/

      ajaxCall();
    })

    $('#address').on('keypress', function (e) {
    	if(e.keyCode === 13){
            $('#address').select();
             //$('#response1').html('');
             $('#debug').html('');
             getPostal(tabIds);
             ajaxCall();
        }
        //return false;
    });

    $('#address').val('Yerevan, Armenia');
    var e = jQuery.Event("keypress");
    e.keyCode = 13;
    $("#address").trigger(e);

});



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
  };


$("#some_btn_submit").on('click', function(){
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


function getPostal(tabIds) {
	var postal = $("#address").val();
	if (postal) {
		$.getJSON("http://www.geonames.org/postalCodeLookupJSON?&callback=?", {postalcode: postal }, function(response) {
			console.log(response)
			if (response && response.postalcodes.length) {
				var html=[]
				response.postalcodes.forEach(function(p) {
					var url='/forecast/?lat='+p.lat+'&lng='+p.lng+'&name='+encodeURIComponent(p.placeName)
			        html.push('<a href='+ url +' data-remote="true" data-method="get">'+p.placeName+'('+p.lat+','+p.lng+')</a>');
      			})

				$('#postalcodes').html( html.join('\n'));
          tabIds.forEach(function(id) {
          $(id).hide();
        });
        $('#postalcodes').show();
			}
		})
	}
};


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
