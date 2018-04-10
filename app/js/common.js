//student_edit_banner
$(function () {
  var $city = $('[name="city"]');
  $("#chooseMetro").hide();

  $.kladr.setDefault({
    verify: true,
    limit: 200,
    spinner: false,
    labelFormat: function (obj, query) {
      return obj.name;
    }
  })


  $city.kladr({
    type: $.kladr.type.city,
    typeCode: $.kladr.typeCode.city,
    sendBefore: function (query) {
      $.kladr.api(query, function (callback) {
        if (callback.length == 0)
          $("#kladr_autocomplete").hide();
        else
          $("#kladr_autocomplete").show();
      });
    },
    check: function checkUnderground (obj){
      console.log(obj);
      if (obj!=null)
        switch (obj.id){
          case '7700000000000'://МСК
            $("#chooseMetro").show();
            break;
          case '7800000000000'://СПБ
            $("#chooseMetro").show();
            break;
          case '3400000100000'://ВЛД
            $("#chooseMetro").show();
            break;
          case '1600000100000'://КЗ
            $("#chooseMetro").show();
            break;
          case '5400000100000'://НСК
            $("#chooseMetro").show();
            break;
          case '6600000100000'://ЕКБ
            $("#chooseMetro").show();
            break;
          case '5200000100000'://НН
            $("#chooseMetro").show();
            break;
          case '6300000100000'://САМ
            $("#chooseMetro").show();
            break;
          default:
            $("#chooseMetro").hide();
        }
      else
          $("#chooseMetro").hide();
    }
    })
  });
//student_edit_about

