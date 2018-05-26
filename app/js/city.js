var cityIndex;
var isQueryValid;

$(function() {

	function checkCorrectCity(query, citiesToCheck) {
 	var isValidate = false;

 	citiesToCheck.forEach(function(element){
 		if (element.name.split("(")[0].replace(/^\s*/,'').replace(/\s*$/,'').toLowerCase() == query.split("(")[0].replace(/^\s*/,'').replace(/\s*$/,'').toLowerCase()){
 				isValidate = true;
 				cityIndex = element.id;
 			};
 		});
 		if (!isValidate)
 			cityIndex = null;
 		return isValidate;
 	}

 	function validateSubway() {
 				if ($("#subway-container") != null)
        			$.ajax({
           			url:"https://api.hh.ru/metro/",
           			dataType: "json",
           			success: function(data, textStatus, request) {
           				if(data.some(function (cityWithSubway) {return cityWithSubway.id == cityIndex;}))
           					$("#subway-container").show();
           				else
           					$("#subway-container").hide();
            			}
            		});
 	}

 	validateSubway();
	var $city = $('#city');
	var outArrayOfCitySuggestions;
	$city.focus(function(){$city.parent().parent().removeClass("has-error");});

    $city.autocomplete({
    source: function (request, responce) {
        var query = request.term;
        $.ajax({
          url:"https://api.hh.ru/suggests/area_leaves?text=" + query,
          dataType: "json",
          success: function(data, textStatus, request) {
            var cities = new Array();
            data.items.forEach(function(datacell, i){
            	cities.push({
            		name: datacell.text,
            		id: datacell.id
            	});
            });
            outArrayOfCitySuggestions = cities;
            isQueryValid = checkCorrectCity(query, cities);
            responce(cities.slice(0,4));
          }
        });
    },
    response: function (event, ui) {
		isQueryValid = checkCorrectCity(event.target.value, ui.content);
		validateSubway();
    },
   	change: function (event, ui) {
   		if (isQueryValid == false)
   			$city.parent().parent().addClass("has-error");
   		if (isQueryValid == true)
   			$city.parent().parent().removeClass("has-error");
    },
   	focus: function( event, ui ) {
        return false;
    },
   	select: function( event, ui ) {
   		$city.val(ui.item.name);
   		cityIndex = ui.item.id;
        validateSubway();
        return false;
    },
    autoFocus: true,
    minLength: 2
  }).autocomplete( "instance" )._renderItem = function (ul, city) {
      return $( "<li class='ui-menu-item'>" )
        .append( "<div class='ui-menu-item-wrapper'>"  + city.name + "</div>")
        .appendTo( ul );
  }

});