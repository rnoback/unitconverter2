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
        templateUrl: 'html/pages/default.html',
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
        templateUrl: 'html/pages/default.html',
        controller: 'currencyController'
    })
    .when('/converter', {
        templateUrl: 'html/pages/default.html',
        controller: 'converterController'
    })
    .when('/comment', {
        templateUrl: 'html/pages/comment.html',
        controller: 'commentController'
    });
});

 converterApp.controller('mainCtrl', ['$scope', function($scope) {
	    			        
    //$('.box-container__content ').startDrag();                                                      
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
            calculateUnits: "&",
            calcHandler: '&'
        },
        link: function (scope, element, attrs){
           /* console.log("scope "+scope.unitObject.id);

            if(scope.unitObject.id === 15){
                element.find('.subfield1').css('display','block');
                //element.finsd('.subfield2').css('display','block');
            }
            */


            var input = element.find('.uc-input');
            input.on('focus', function(evt){
                target = $(evt.target);
                $('.input-wrap__content').removeClass('active');
                target.parent().addClass('active');
            });         

            scope.clickCalc = function(obj){
                var v = element.find('.uc-input').val();

                var v1 = element.find('.subfield1').val();
                var v2 = element.find('.subfield2').val();
                scope.calcHandler( {aunit:obj, avalue:v, avalue1:v1, avalue2:v2} ); 
            }

            scope.keyCalc = function(obj){
                var v = parseFloat(element.find('.uc-input').val());
                //v = (v);
                //console.log("v "+v);
                //element.find('.uc-input').val(v);
                var v1 = element.find('.subfield1').val();
                var v2 = element.find('.subfield2').val();
                scope.calcHandler( {aunit:obj, avalue:v, avalue1:v1, avalue2:v2} ); 
            }

            if(scope.unitObject.special) {
                element.find('.input-wrap__content').addClass(scope.unitObject.special);
                element.find('.subfield1').css('display','inline');
                //element.finsd('.subfield2').css('display','block');
                return;
            }else{
                element.find('.input-wrap__content').removeClass(scope.unitObject.special);
                element.find('.subfield1').css('display','none');
                // $('.input-wrap__content').removeClass('double');
                //element.find('.subfield1').css('display','none');
            }

            /*
            $('.uc-input').on('keypress', function(evt){
                var code = (evt.keyCode ? evt.keyCode : evt.which);
                if(code == 13) { //Enter keycode
                    var target = $(evt.target);
                    var v = target.val();
                    var obj = scope.unitObject;
                    console.log("obj.cname "+obj.cname)
                    scope.calcHandler( {aunit:obj, avalue:v} ); 
                }
            });
            */
           /* calcBtn.on('click ', function(evt){

                var target = $(evt.target).parent().parent();

                var value = target.find('.uc-input').val();

                var id = scope.unitObject.id; 

                //scope.$apply(attrs.calcHandler);
                // call calculation function on scope
                scope.calcHandler({aid:id, avalue:value});
            });

            

            scope.clickMe = function(obj){
                var v = element.find('.uc-input').val();
                scope.calculateUnits( {aunit:obj, avalue:v} );  
            }*/
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
           
            scope.calculateUnits( {aunit:obj, avalue:v} );  
          }


        }  
    };
});

}());