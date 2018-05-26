$(function() {
  var $subway = $('#subway');
  $subway.autocomplete({
    source: function (request, responce) {
        var query = request.term;
        $.ajax({
          url:"https://api.hh.ru/metro/" + cityIndex,
          dataType: "json",
          success: function(data, textStatus, request) {
            var stations = new Array();
            data.lines.forEach(function(line, i){
              line.stations.forEach(function(station, j){
                stations.push({
                    name: station.name,
                    color: line.hex_color
                });
              });
            });
            stations = stations.filter(function(station) {
              return station.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
            });
            stations = stations.sort(function (a, b) {
              if (a.name.toLowerCase().indexOf(query.toLowerCase()) > b.name.toLowerCase().indexOf(query.toLowerCase()))
                return 1;
              if (a.name.toLowerCase().indexOf(query.toLowerCase()) < b.name.toLowerCase().indexOf(query.toLowerCase()))
                return -1;
              return 0;
            });
            responce(stations.slice(0,4));
          }
        });
    },
    select: function( event, ui ) {
        $('#subway').val(ui.item.name);
        return false;
    },
    focus: function( event, ui ) {
        return false;
    },
    autoFocus: true,
    minLength: 2
  }).autocomplete( "instance" )._renderItem = function (ul, station) {
      return $( "<li class='ui-menu-item'>" )
        .append( "<div class='ui-menu-item-wrapper'>" + "<i class='fas fa-circle' style='color:#" + station.color +"'></i>" + " " + station.name + "</div>")
        .appendTo( ul );
  }
});