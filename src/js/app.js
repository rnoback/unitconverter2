(function (){


// Module
var converterApp  = angular.module('converterApp',
    ['ngRoute', 'ngResource', 'angularjs-dropdown-multiselect', 'ng-sortable']);

//Routes
converterApp.config(function ($routeProvider) {

    $routeProvider
    
    .when('/', {
        templateUrl: 'html/pages/default.html',
        controller: 'lengthController'
    })
    
    .when('/length', {
        templateUrl: 'html/pages/default.html',
        controller: 'lengthController'
    })
    .when('/area', {
        templateUrl: 'html/pages/default.html',
        controller: 'areaController'
    })
    .when('/volume', {
        templateUrl: 'html/pages/default.html',
        controller: 'volumeController'
    })
     .when('/dry-volume', {
        templateUrl: 'html/pages/default.html',
        controller: 'dryVolumeController'
    })
    .when('/mass', {
        templateUrl: 'html/pages/default.html',
        controller: 'massController'
    })
    .when('/power', {
        templateUrl: 'html/pages/default.html',
        controller: 'powerController'
    })
    .when('/energy', {
        templateUrl: 'html/pages/default.html',
        controller: 'energyController'
    })
    .when('/force', {
        templateUrl: 'html/pages/default.html',
        controller: 'forceController'
    })
    .when('/temperature', {
        templateUrl: 'html/pages/temperature.html',
        controller: 'temperatureController'
    })
    .when('/velocity', {
        templateUrl: 'html/pages/default.html',
        controller: 'velocityController'
    })
    .when('/acceleration', {
        templateUrl: 'html/pages/default.html',
        controller: 'accelerationController'
    })    
    .when('/time', {
        templateUrl: 'html/pages/default.html',
        controller: 'timeController'
    })   
    .when('/data', {
        templateUrl: 'html/pages/default.html',
        controller: 'dataController'
    })
    .when('/angle', {
        templateUrl: 'html/pages/default.html',
        controller: 'angleController'
    })    

    .when('/currency', {
        templateUrl: 'html/pages/currency.html',
        controller: 'currencyController'
    })
    
    .when('/converter', {
        templateUrl: 'html/pages/default.html',
        controller: 'converterController'
    });
});

 converterApp.controller('mainCtrl', ['$scope', function($scope) {
	    			    	

	function resizeBg() {
					
	}
	                   			
	//theWindow.resize(resizeBg).trigger("resize");
     
 }]);


converterApp.directive('unitSelector', function($timeout){
     return {
        templateUrl: 'html/directives/unitselector.html',
        replace: true
     };
});

converterApp.directive('unitWrap', function($timeout){
    return {
        templateUrl: 'html/directives/unitwrap.html',
        replace: true,
        scope: {
            unitObject:'=',
            calculateUnits: "&"
        },
        link: function (scope, element, attrs){
          scope.clickMe = function(obj){

            var v = element.find('.uc-input').val();
            console.log("v "+v);
            scope.calculateUnits( {aunit:obj, avalue:v} );  
          }
        } 
       
    };
});

converterApp.directive('unitWrapTemperature', function($timeout){
    return {
        templateUrl: 'html/directives/unitwrapTemperature.html',
        replace: true,
        scope: {
            unitObject:'=',
            calculateUnits: "&"
        },
        link: function (scope, element, attrs){
          scope.clickMe = function(obj){

            var v = element.find('.uc-input').val();
            console.log("v "+v);
            scope.calculateUnits( {aunit:obj, avalue:v} );  
          }
        } 
       
    };
});

}());