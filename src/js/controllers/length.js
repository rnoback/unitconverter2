(function () {
    /*jshint -W071 */
    'use strict';
    var converterApp  = angular.module('converterApp');
    
    converterApp.controller('lengthController', 
        ['$scope', '$filter', '$location', 'unitSelectionService', 
        function($scope, $filter, $location, unitSelectionService){

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
        if(!$scope.selectedUnit) { 
            $scope.selectedUnit = 'Length';
        }else{
            
        }
        $scope.unitCustomTexts = {buttonDefaultText:$scope.selectedUnit};
        $scope.redirectUnit = unitSelectionService.redirectUnit;
                
        $scope.unit1 = {
            id: 1, 
            label: 'Meters',
            maker: 'm',
            cname: 'unit1',
            ticked: true,
            value: 0,
            factor: 1,
            type: 'Metric'
        };
        $scope.unit2 = {
            id: 2, 
            label: 'Centimeters', 
            maker: 'cm', 
            cname: 'unit2', 
            ticked: true,
            value: 0,
            factor: 100,
            type: 'Metric'
        };
        $scope.unit3 = {
            id: 3, 
            label: 'Kilometers',
            maker: 'km',
            cname: 'unit3',
            ticked: true,
            value: 0,
            factor: 0.001,
            type: 'Metric'
        };
        $scope.unit4 = {
            id: 4, 
            label: 'Millimeters',
            maker: 'mm',
            cname: 'unit4',
            ticked: false,
            value: 0,
            factor: 1000,
            type: 'Metric'
        };
        $scope.unit5 = {
            id: 5, 
            label: 'Microns',
            maker: 'um',
            cname: 'unit5',
            ticked: false,
            value: 0,
            factor: 1000000,
            type: 'Metric'
        };

        $scope.unit6 = {
            id: 6, 
            label: 'Mils',
            maker: '',
            cname: 'unit6',
            ticked: false,
            value: 0,
            factor: 39370.07874015748,
            type: 'Imperial'
        };
        $scope.unit7 = {
            id: 7, 
            label: 'Inches', 
            maker: 'in',
            cname: 'unit7',
            ticked: true,
            value: 0,
            factor: 39.37007874,
            type: 'Imperial'
        };
        $scope.unit8 = {
            id: 8, 
            label: 'Feet', 
            maker: 'ft', 
            cname: 'unit8',
            ticked: true,
            value: 0,
            factor: 3.280839895,
            type: 'Imperial'
        };

        $scope.unit9 = {
            id: 9, 
            label: 'Yards',
            maker: 'yd',
            cname: 'unit9',
            ticked: true,
            value: 0,
            factor: 1.0936132983377078,
            type: 'Imperial'
        };
        
        $scope.unit10 = {
            id: 10, 
            label: 'Miles',
            maker: 'mi',
            cname: 'unit10',
            ticked: true,
            value: 0,
            factor: 0.000621371192237,
            type: 'Imperial'
        };
        $scope.unit11 = {
            id: 11, 
            label: 'Miles (nautical)',
            maker: '',
            cname: 'unit11',
            ticked: false,
            value: 0,
            factor: 0.0005399568034557,
            type: 'Imperial'
        };


        $scope.unit12 = {
            id: 12, 
            label: 'Furlongs',
            maker: '',
            cname: 'unit12',
            ticked: false,
            value: 0,
            factor: 0.00497095959596,
            type: ''
        };
        $scope.unit13 = {
            id: 13, 
            label: 'Rods',
            maker: '',
            cname: 'unit13',
            ticked: false,
            value: 0,
            factor: 0.198838782,
            type: ''
        };    
        $scope.unit14 = {
            id: 14, 
            label: 'Light years',
            maker: '',
            cname: 'unit14',
            ticked: false,
            value: 0,
            factor: 0.000000000000000105616,
            type: ''
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
            $scope.unit14
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
                if($scope.unitsTicked[i].id ===  curUnit.id){
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
        $scope.$watch('unit6.value', function(){
            $scope.unit1.value = formatFloat($scope.unit6.value / $scope.unit6.factor);
        });
        $scope.$watch('unit7.value', function(){
            $scope.unit1.value = formatFloat($scope.unit7.value / $scope.unit7.factor);
        });
        $scope.$watch('unit8.value', function(){
            $scope.unit1.value = formatFloat($scope.unit8.value / $scope.unit8.factor);
        });
        $scope.$watch('unit9.value', function(){
            $scope.unit1.value = formatFloat($scope.unit9.value / $scope.unit9.factor);
        });
        $scope.$watch('unit10.value', function(){
            $scope.unit1.value = formatFloat($scope.unit10.value / $scope.unit10.factor);
        });
        $scope.$watch('unit11.value', function(){
            $scope.unit1.value = formatFloat($scope.unit11.value / $scope.unit11.factor);
        });
        $scope.$watch('unit12.value', function(){
            $scope.unit1.value = formatFloat($scope.unit12.value / $scope.unit12.factor);
        });
        $scope.$watch('unit13.value', function(){
            $scope.unit1.value = formatFloat($scope.unit13.value / $scope.unit13.factor);
        });
        $scope.$watch('unit14.value', function(){
            $scope.unit1.value = formatFloat($scope.unit14.value / $scope.unit14.factor);
        });
        
         // Meters (MAIN unit)
        $scope.$watch('unit1.value', function(){
            $scope.unit2.value = formatFloat($scope.unit1.value * $scope.unit2.factor);
            $scope.unit3.value = formatFloat($scope.unit1.value * $scope.unit3.factor);
            $scope.unit4.value = formatFloat($scope.unit1.value * $scope.unit4.factor);
            $scope.unit5.value = formatFloat($scope.unit1.value * $scope.unit5.factor);
            $scope.unit6.value = formatFloat($scope.unit1.value * $scope.unit6.factor);
            $scope.unit7.value = formatFloat($scope.unit1.value * $scope.unit7.factor);
            $scope.unit8.value = formatFloat($scope.unit1.value * $scope.unit8.factor);
            $scope.unit9.value = formatFloat($scope.unit1.value * $scope.unit9.factor);
            $scope.unit10.value = formatFloat($scope.unit1.value * $scope.unit10.factor);
            $scope.unit11.value = formatFloat($scope.unit1.value * $scope.unit11.factor);
            $scope.unit12.value = formatFloat($scope.unit1.value * $scope.unit12.factor);
            $scope.unit13.value = formatFloat($scope.unit1.value * $scope.unit13.factor);
            $scope.unit14.value = formatFloat($scope.unit1.value * $scope.unit14.factor);
        });
        
         // helper function for rounding
        function formatFloat(aFloat) {
      // http://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros
            //return parseFloat(aFloat.toFixed(6));
            return aFloat;
        } 
    }]);    
    
    
 
}());