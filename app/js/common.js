//student_edit_banner
$(function () {
  var $city = $('[name="city"]')

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
    check: function (obj){
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

var expList = angular.module('expList', []);
expList.controller('InputList', [ '$scope', function($scope){
  $scope.workSpaces = [{startDate: new Date ("2018-04"),
                        endDate: new Date ("2018-04"),
                        organization: '',
                        post: '',
                        info: ''}]
  $scope.addWorkSpace = function (){
    $scope.workSpaces = $scope.workSpaces.concat([{startDate: new Date ("2018-04"), endDate: new Date ("2018-04"), organization: '', post: '', info: ''}]);
  }
  $scope.removeWorkSpace = function(i){
    $scope.workSpaces = $scope.workSpaces.filter(function (dataNode, j) {
      return i!==j; 
    })
  }
}]);

var confsList = angular.module('confsList', []);
confsList.controller('InputList', [ '$scope', function($scope){
  $scope.confs = [{name: '',
                   about: ''}]
  $scope.addConf = function (){
    $scope.confs = $scope.confs.concat([{name: 'лежать', about: ''}]);
  }
  $scope.removeConf = function(i){
    $scope.confs = $scope.confs.filter(function (dataNode, j) {
      return i!==j; 
    })
  }
}]);

var courcesList = angular.module('courcesList', []);
courcesList.controller('InputList', [ '$scope', function($scope){
  $scope.cources = [{name: '',
                   organization: '',
                   outputQualification: ''}]
  $scope.addCource = function (){
    $scope.cources = $scope.cources.concat([{name: '', organization: '', outputQualification: ''}]);
  }
  $scope.removeCource = function(i){
    $scope.cources = $scope.cources.filter(function (dataNode, j) {
      return i!==j; 
    })
  }
}])