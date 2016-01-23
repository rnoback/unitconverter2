(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('forceController', 
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
        label: 'Newton', 
        marker: '', 
        cname: 'unit1',
        ticked: true,
        value: 0,
        factor: 1
    };

    $scope.unit2 = {
        id: 2, 
        label: 'Ounce-force',
        maker: 'kW', 
        cname: 'unit2', 
        ticked: true,
        value: 0,
        factor: 3.59694309
    };    

    $scope.unit3 = {
        id: 3, 
        label: 'Pound-force', 
        maker: '', 
        cname: 'unit3',
        ticked: true,
        value: 0,
        factor: 0.224808943
    };
   
    $scope.unit4 = {
        id: 4, 
        label: 'Dyne', 
        marker: '', 
        cname: 'unit4',
        ticked: true,
        value: 0,
        factor: 100000
    };
    $scope.unit5 = {
        id: 5, 
        label: 'Kilogram-force', 
        marker: '', 
        cname: 'unit5', 
        ticked: true,
        value: 0,
        factor: 0.101971621
    };

    
   
    
    $scope.dataCollection = 
    [
        $scope.unit1, 
        $scope.unit2, 
        $scope.unit3, 
        $scope.unit4,
        $scope.unit5
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
    
    $scope.getTickedUnits();
    
    
    $scope.$watch('unit2.value', function(){
        $scope.unit1.value = formatFloat($scope.unit2.value / $scope.unit2.factor);
    });
    $scope.$watch('unit3.value', function(){
        $scope.unit1.value = formatFloat($scope.unit3.value / $scope.unit3.factor);
    });
    $scope.$watch('unit4.value', function(){
        $scope.unit1.value = formatFloat($scope.unit4.value / $scope.unit4.factor);
    });
    $scope.$watch('unit5.value', function(){
        $scope.unit1.value = formatFloat($scope.unit5.value / $scope.unit5.factor);
    });
    
     // Main unit
    $scope.$watch('unit1.value', function(){
        $scope.unit2.value = formatFloat($scope.unit1.value * $scope.unit2.factor);
        $scope.unit3.value = formatFloat($scope.unit1.value * $scope.unit3.factor);
        $scope.unit4.value = formatFloat($scope.unit1.value * $scope.unit4.factor);
        $scope.unit5.value = formatFloat($scope.unit1.value * $scope.unit5.factor); 
    });
    
     // helper function for rounding
    function formatFloat(aFloat) {
        // http://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros
       // return parseFloat(aFloat.toFixed(6));
        return aFloat;
    }
    

}]);
    
    
 
}());