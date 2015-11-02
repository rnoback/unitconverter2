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
        },
        link: function(scope, element, attrs){
             $timeout(function(){
                 element.on('focus', function(evt){
                     console.log(evt.target);
                     evt.target.select();
                 });
             }, 500);
        }
    };
});