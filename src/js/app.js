// Module
var converterApp  = angular.module('converterApp',
    ['ngRoute', 'ngResource', 'angularjs-dropdown-multiselect', 'ng-sortable']);

//Routes
converterApp.config(function ($routeProvider) {

    $routeProvider
    
    .when('/', {
        templateUrl: 'html/pages/length.html',
        controller: 'lengthController'
    })
    
    .when('/length', {
        templateUrl: 'html/pages/length.html',
        controller: 'lengthController'
    })
    
    .when('/weight', {
        templateUrl: 'html/pages/weight.html',
        controller: 'weightController'
    })

    
    .when('/converter', {
        templateUrl: 'html/pages/converter.html',
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
            unitObject:'='
        }
    };
});