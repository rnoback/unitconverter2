(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('temperatureController', 
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
        label: 'Degrees Celsius', 
        marker: 'C', 
        cname: 'unit1',
        ticked: true,
        value: 0,
        factor: 1,
        type: ''
    };

    $scope.unit2 = {
        id: 2, 
        label: 'Degrees Kelvin',
        maker: 'K', 
        cname: 'unit2', 
        ticked: true,
        value: 0,
        factor: 1,
        type: ''
    };    

    $scope.unit3 = {
        id: 3, 
        label: 'Degrees Fahrenheit', 
        maker: '', 
        cname: 'unit3',
        ticked: true,
        value: 0,
        factor: 1.8,
        type: ''
    };
   
    
   
    
    $scope.dataCollection = 
    [
        $scope.unit2,
        $scope.unit1, 
        $scope.unit3
    ];


    // collapse window => needs to go in a directive
    $scope.windowOpen = true;
    
    $('.btn-collapse-window').on('click', function(){
        if($scope.windowOpen) {
            $(this).find('span').removeClass('fa-chevron-up');
            $(this).find('span').addClass('fa-chevron-down');
            $(this).closest('#box-container').addClass('collapsed');
            $('.box-body').hide();
            $('.units-dropdown').hide();
            $('.dropdown-multiselect').hide();
            $scope.windowOpen = false;
        }else{
            $(this).find('span').addClass('fa-chevron-up');
            $(this).find('span').removeClass('fa-chevron-down');
            $(this).closest('#box-container').removeClass('collapsed');
            $('.box-body').show();
            $('.units-dropdown').show();
            $('.dropdown-multiselect').show();
            $scope.windowOpen = true;
        }
    });



    
    
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
    

    $scope.csumk = 273.15;
    $scope.csumf = 32;
    

    function c2f(c) {
        return formatNumberFactory.formatNumber(9/5 * parseFloat(c) + 32);
    }
    function c2k(c) {
        return formatNumberFactory.formatNumber(parseFloat(c) + $scope.csumk);
    }
    function k2c(k) {
        return formatNumberFactory.formatNumber(parseFloat(k) - $scope.csumk);
    }
    function k2f(k) {
        return formatNumberFactory.formatNumber((parseFloat(k) - $scope.csumk) * 1.8000 + $scope.csumf);
    }
    function f2c(f) {
        return formatNumberFactory.formatNumber((parseFloat(f) - 32) / 1.8);
    }
    function f2k(f) {
        return formatNumberFactory.formatNumber( ((parseFloat(f) - 32) / 1.8) + $scope.csumk);
    }

    /*
    $scope.$watch('unit2.value', function(){
        $scope.unit1.value = k2c($scope.unit2.value);
    });
    $scope.$watch('unit3.value', function(){
        $scope.unit1.value = f2c($scope.unit3.value);
    });
    
     // Main unit
    $scope.$watch('unit1.value', function(){
        $scope.unit2.value = c2k($scope.unit1.value);
        $scope.unit3.value = c2f($scope.unit1.value);
    });
*/


    $scope.calcHandler = function(obj, inputValue){

        console.log(obj.id);

        if(obj.id === 1){
            $scope.unit2.value = c2k(inputValue);
            $scope.unit3.value = c2f(inputValue);
        }else if(obj.id === 2){
            
            $scope.unit1.value = k2c(inputValue);
            $scope.unit3.value = k2f(inputValue);
        }else if(obj.id === 3){
            $scope.unit1.value = f2c(inputValue);
            $scope.unit2.value = f2k(inputValue);
        }
    }

    
}]);
    
    
 
}());