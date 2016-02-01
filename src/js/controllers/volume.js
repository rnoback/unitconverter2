(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('volumeController', 
        ['$scope', '$filter', '$location', 'unitSelectionService', 'formatNumberFactory',
        function($scope, $filter, $location, unitSelectionService, formatNumberFactory) {

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
        label: 'Liters', 
        maker: 'l', 
        cname: 'unit1', 
        ticked: true,
        value: 0,
        factor: 1,
        type: 'Metric'
    };    
    $scope.unit2 = {
        id: 2, 
        label: 'Milliliters', 
        marker: 'ml', 
        cname: 'unit2',
        ticked: false,
        value: 0,
        factor: 1000,
        type: 'Metric'
    };
    
    $scope.unit3 = {
        id: 3, 
        label: 'Cubic Meters', 
        maker: '', 
        cname: 'unit3', 
        ticked: true,
        value: 0,
        factor: 0.001,
        type: 'Metric'
    };

     $scope.unit4 = {
        id: 4, 
        label: 'Cubic Centimeters', 
        maker: 'cc', 
        cname: 'unit4', 
        ticked: true,
        value: 0,
        factor: 1000,
        type: 'Metric'
    };
    
     $scope.unit5 = {
        id: 5, 
        label: 'Cubic Millimeters',
        maker: '',
        cname: 'unit5',
        ticked: false,
        value: 0,
        factor: 1000000,
        type: 'Metric'
    };

    $scope.unit6 = {
        id: 6, 
        label: 'Cubic Inches (ci)',
        maker: '',
        cname: 'unit6',
        ticked: true,
        value: 0,
        factor: 61.02374409 ,
        type: 'Imperial'
    };
    $scope.unit7 = {
        id: 7, 
        label: 'Cubic Feet',
        maker: '',
        cname: 'unit7',
        ticked: true,
        value: 0,
        factor: 0.035314667,
        type: 'Imperial'
    };
    
    $scope.unit8 = {
        id: 8, 
        label: 'Cubic Yards',
        maker: '',
        cname: 'unit8',
        ticked: false,
        value: 0,
        factor: 0.001307951,
        type: 'Imperial'
    };
    $scope.unit9 = {
        id: 9, 
        label: 'Teaspoon',
        maker: 'tsp',
        cname: 'unit9',
        ticked: false,
        value: 0,
        factor: 202.88413662,
        type: 'Imperial Fluid'
    };
    
    $scope.unit10 = {
        id: 10, 
        label: 'tablespoon',
        maker: 'tbsp',
        cname: 'unit10',
        ticked: false,
        value: 0,
        factor: 67.6280454,
        type: 'Imperial Fluid'
    };
    $scope.unit11 = {
        id: 11, 
        label: 'Fluid Ounce',
        maker: '',
        cname: 'unit11',
        ticked: false,
        value: 0,
        factor: 33.8140227,
        type: 'Imperial Fluid'
    };
    $scope.unit12 = {
        id: 12, 
        label: 'Cup',
        maker: '',
        cname: 'unit12',
        ticked: false,
        value: 0,
        factor: 4.226752838,
        type: 'Imperial Fluid'
    };
    $scope.unit13 = {
        id: 13, 
        label: 'Pint (liquid)',
        maker: '',
        cname: 'unit13',
        ticked: false,
        value: 0,
        factor: 2.113376419,
        type: 'Imperial Fluid'
    };
    $scope.unit14 = {
        id: 14, 
        label: 'Quart (liquid)',
        maker: '',
        cname: 'unit14',
        ticked: false,
        value: 0,
        factor: 1.056688209,
        type: 'Imperial Fluid'
    };
    $scope.unit15 = {
        id: 15, 
        label: 'Gallon',
        maker: '',
        cname: 'unit15',
        ticked: false,
        value: 0,
        factor: 0.264172052,
        type: 'Imperial Fluid'
    };
    $scope.unit16 = {
        id: 16, 
        label: 'Barrel',
        maker: '',
        cname: 'unit16',
        ticked: false,
        value: 0,
        factor: 0.006289811,
        type: 'Imperial Fluid'
    };
    $scope.unit17 = {
        id: 17, 
        label: 'Arce Feet',
        maker: '',
        cname: 'unit17',
        ticked: false,
        value: 0,
        factor: 0.0000000810708,
        type: 'Imperial Fluid'
    };
    
   
    
    $scope.dataCollection = 
    [
        $scope.unit1, 
        $scope.unit2, 
        $scope.unit3, 
        $scope.unit4,
        $scope.unit5, 
        $scope.unit6,
        $scope.unit7,
        $scope.unit8,
        $scope.unit9,
        $scope.unit10,
        $scope.unit11,
        $scope.unit12,
        $scope.unit13,
        $scope.unit14,
        $scope.unit15,
        $scope.unit16,
        $scope.unit17
    ];
    
    
    
    //Filter Collection
    $scope.dataCollection = $filter('orderBy')($scope.dataCollection, 'type');
    
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
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit2.value / $scope.unit2.factor);
    });
    $scope.$watch('unit3.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit3.value / $scope.unit3.factor);
    });
    $scope.$watch('unit4.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit4.value / $scope.unit4.factor);
    });
    $scope.$watch('unit5.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit5.value / $scope.unit5.factor);
    });
    $scope.$watch('unit6.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit6.value / $scope.unit6.factor);
    });
    $scope.$watch('unit7.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit7.value / $scope.unit7.factor);
    });
    $scope.$watch('unit8.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit8.value / $scope.unit8.factor);
    });
    $scope.$watch('unit9.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit9.value / $scope.unit9.factor);
    });
    $scope.$watch('unit10.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit10.value / $scope.unit10.factor);
    });
    $scope.$watch('unit11.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit11.value / $scope.unit11.factor);
    });
    $scope.$watch('unit12.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit12.value / $scope.unit12.factor);
    });
    $scope.$watch('unit13.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit13.value / $scope.unit13.factor);
    });
    $scope.$watch('unit14.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit14.value / $scope.unit14.factor);
    });
    $scope.$watch('unit15.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit15.value / $scope.unit15.factor);
    });
    $scope.$watch('unit16.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit16.value / $scope.unit16.factor);
    });
    $scope.$watch('unit17.value', function(){
        $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit17.value / $scope.unit17.factor);
    });
    
    
    
     // MAIN unit
    $scope.$watch('unit1.value', function(){
        $scope.unit2.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit2.factor);
        $scope.unit3.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit3.factor);
        $scope.unit4.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit4.factor);
        $scope.unit5.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit5.factor);
        $scope.unit6.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit6.factor);
        $scope.unit7.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit7.factor);
        $scope.unit8.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit8.factor);
        $scope.unit9.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit9.factor);
        $scope.unit10.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit10.factor);
        $scope.unit11.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit11.factor);
        $scope.unit12.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit12.factor);
        $scope.unit13.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit13.factor);
        $scope.unit14.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit14.factor);
        $scope.unit15.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit15.factor);
        $scope.unit16.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit16.factor);
        $scope.unit17.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit17.factor);
    });

}]);
    
    
 
}());