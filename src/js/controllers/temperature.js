(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('temperatureController', 
        ['$scope', '$filter', '$location', 'unitSelectionService', 
        function($scope, $filter, $location, unitSelectionService) {

    $scope.unitsCollection = unitSelectionService.units;
    $scope.defaultButtonText = unitSelectionService.defaultButtonText; 
    
    $scope.unitsModel = {};
    $scope.unitsSettings = { 
        selectionLimit: 1,
        showUncheckAll: false,
        showCheckAll: false
    }; 
            
        
    // Get last segment of URL
    var url = $location.path();
    $scope.selectedUnit = url.substr(url.lastIndexOf('/') + 1); 

    // Add it to text button    
    $scope.unitCustomTexts = {buttonDefaultText:$scope.selectedUnit};
    
    $scope.redirectUnit = unitSelectionService.redirectUnit;
    
    $scope.unit1 = {
        id: 1, 
        label: 'Degrees Celsius', 
        marker: 'C', 
        cname: 'unit1',
        ticked: true,
        value: 0,
        factor: 1,
        sum: 0
    };

    $scope.unit2 = {
        id: 2, 
        label: 'Degrees Kelvin',
        maker: 'K', 
        cname: 'unit2', 
        ticked: true,
        value: 0,
        factor: 1,
        sum: 273.16
    };    

    $scope.unit3 = {
        id: 3, 
        label: 'Degrees Fahrenheit', 
        maker: '', 
        cname: 'unit3',
        ticked: true,
        value: 0,
        factor: 1.8,
        sum: 32
    };
   
    
   
    
    $scope.dataCollection = 
    [
        $scope.unit1, 
        $scope.unit2, 
        $scope.unit3
    ];
    
    
    
    //Filter Collection
    $scope.dataCollection = $filter('orderBy')($scope.dataCollection, 'id');
    
    // Setup frequently used units
    $scope.dataModel = [];
    $scope.dataModel = (function(){
        var arr = [];
        for(var i=0; i<$scope.dataCollection.length; i++){
             if($scope.dataCollection[i].ticked){
                 arr.push({id:$scope.dataCollection[i].id});
            }
        }
        return arr;
     })();        
       
    
    $scope.dataSettings = { 
        dynamicTitle: false,
        enableSearch: false,
        scrollableHeight: '400px',
        scrollable: true,
        externalIdProp: ''
    }; 

    var defaultButtonText = $scope.defaultButtonText;
    $scope.dataCustomTexts = {buttonDefaultText: defaultButtonText};
    
    $scope.unitsTicked = [];
    
    $scope.getTickedUnits = function(){
        for(var i=0; i<$scope.dataCollection.length; i++){
            if($scope.dataCollection[i].ticked){
                $scope.unitsTicked.push($scope.dataCollection[i]);
            }
        }
    };
    
    $scope.setAllUnits = function(){
         for(var i=0; i<$scope.dataCollection.length; i++){
             $scope.unitsTicked.push($scope.dataCollection[i]);
         }
    };
    
    $scope.addUnit = function(curUnit){
        curUnit.ticked = true;
        $scope.unitsTicked.push(curUnit);
    };
     
    $scope.removeUnit = function(curUnit){ 
        for(var i=0; i<$scope.unitsTicked.length; i++){
            if($scope.unitsTicked[i].id === curUnit.id){
                $scope.unitsTicked.splice(i, 1);
            }
        }
    };
   
    $scope.addAllUnits = function(){
       $scope.unitsTicked = []; 
    };
    
    $scope.removeAllUnits = function(){ 
        $scope.unitsTicked = []; 
    };
    
    $scope.resetUnits = function(){ 
        
    };
    
    function c2f(c) {
        return 9/5 * parseFloat(c) + 32;
    }
    function f2c(f) {
        return 5/9 * (f - 32);
    }

    function k2c(k) {
        return k + 273;
    }

    function c2k(c) {
        return c + 273;
    }



    $scope.getTickedUnits();
    
    /*
    
    $scope.$watch('unit2.value', function(){
        $scope.unit1.value = formatFloat(($scope.unit2.value / $scope.unit2.factor));


    });
    $scope.$watch('unit3.value', function(){
        $scope.unit1.value = formatFloat(($scope.unit3.value / $scope.unit3.factor) - $scope.unit3.sum);
         //var c = f2c($scope.unit3.value);
         //$scope.unit1.value = formatFloat(c); 
         //console.log(c);
    });
     // Main unit
    $scope.$watch('unit1.value', function(){
       // var f = ($scope.unit1 + $scope.unit2.sum);
       // var k = ($scope.unit1.value * $scope.unit3.factor) + $scope.unit3.sum;
        //$scope.unit2.value = formatFloat(f);
        //var f = c2f($scope.unit1.value);
        //$scope.unit3.value = formatFloat(f); 

        // var k = $scope.unit1.value + $scope.unit2.sum;
        // $scope.unit2.value = formatFloat(k); 
    });
    
     // helper function for rounding
    function formatFloat(aFloat) {
        // http://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros
       // return parseFloat(aFloat.toFixed(6));
        return aFloat;
    }
    */

    $scope.calculateUnits = function(selectedUnit, inputValue){
        //console.log("obje "+obj);
        //console.log($scope.dataCollection);
        

       

        $.each( $scope.dataCollection, function( index, value ){

            console.log($scope.dataCollection[index].factor);

            if(selectedUnit.cname === "unit1") {
                $scope.unit2.value = $scope.unit2.sum + (inputValue * $scope.unit2.factor);
                $scope.unit3.value = $scope.unit3.sum + (inputValue * $scope.unit3.factor);
                console.log("its 1");
            }else if(selectedUnit.cname === "unit2") {
                $scope.unit1.value = $scope.unit1.sum + (inputValue * $scope.unit1.factor);
                $scope.unit3.value = $scope.unit3.sum + (inputValue * $scope.unit3.factor);
                console.log("its 2");
            }else if(selectedUnit.cname === "unit3") {
                $scope.unit2.value = $scope.unit2.sum + (inputValue * $scope.unit2.factor);
                $scope.unit1.value = $scope.unit1.sum + (inputValue * $scope.unit1.factor);
                console.log("its 3");
            }
        });

       
        console.log("selectedUnit "+selectedUnit.cname);
        return "selectedUnit " + selectedUnit.cname; 
    }

}]);
    
    
 
}());