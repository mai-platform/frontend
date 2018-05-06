//student_edit_banner
//student_edit_about

//Неоптизированный код для листов
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
    $scope.confs = $scope.confs.concat([{name: '', about: ''}]);
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

var sertsList = angular.module('sertsList', []);
sertsList.controller('InputList', [ '$scope', function($scope){
  $scope.serts = [{name: '',
                   organization: ''}]
  $scope.addSert = function (){
    $scope.serts = $scope.serts.concat([{name: '', organization: ''}]);
  }
  $scope.removeSert = function(i){
    $scope.serts = $scope.serts.filter(function (dataNode, j) {
      return i!==j; 
    })
  }
}])

var tagInput = angular.module('tagInput', ['ngTagsInput']);
tagInput.controller('Input', [ '$scope','$http', function($scope, $http){
  $scope.skills = [];
  $scope.loadSkills = function($query) {
    return $http.get('../js/json/skills.json').then(function (skills) {
      var skills = skills.data;
          return skills.filter(function(skill) {
              return skill.toLowerCase().indexOf($query.toLowerCase()) != -1;
            });
          });
      };
}]);

var autoComplete = angular.module('autoComplete',[]);
autoComplete.value('$tether', {
  isHaveSubway: false
});
autoComplete.controller('CompleteCity', ['$scope','$http','$tether', function($scope, $http,$tether){
  $scope.tether = $tether;
  $scope.cityName = "";

  function formatOutput(suggestion){
          var refine = (suggestion.data.capital_marker == "0" && suggestion.data.fias_level == "4") ? " (" + suggestion.data.region_with_type + ")" : "";
          return suggestion.data.city + refine;
  }

  $scope.$watch("cityName", function(value){
      console.log(value);
    if (value == "Москва")
      $tether.isHaveSubway = true;
    else $tether.isHaveSubway = false;
  });

  var $city = $('#city');
    $city.suggestions({
        token: "43ce5d34b9c8e768d0396b434ac7fded92ee3ee5",
        type: "ADDRESS",
        count: 5,
        addon: "none",
        hint: false,
        minChars: 2,
        noCache: true,
        noSuggestionsHint: false,
        bounds: "city",
        deferRequestBy: 250,
        onSearchComplete: function (query, suggestions) {
          suggestions.forEach(function (suggestion, i) {
            suggestion.value = formatOutput(suggestion);
          });
          return suggestions;
        },
        formatResult: function (value, currentValue, suggestion, options) {
          return formatOutput(suggestion);
        },
        formatSelected: function (suggestion) {
          return formatOutput(suggestion);
        }
    });
}])
autoComplete.controller('CompleteSubway', ['$scope','$http','$tether', function($scope, $http,$tether){
  $scope.tether = $tether;
  console.log($tether);
}])