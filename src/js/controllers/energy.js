(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('energyController', 
        ['$scope', '$filter', '$location', 'unitSelectionService', 'formatNumberFactory',
        function($scope, $filter, $location, unitSelectionService, formatNumberFactory) {

    $scope.unitsCollection = unitSelectionService.units;
    $scope.defaultButtonText = unitSelectionService.defaultButtonText; 
    
    $scope.unitsModel = {};
    $scope.unitsSettings = { 
        selectionLimit: 1,
        showUncheckAll: false,
        showCheckAll: false,
        closeOnSelect: true
    }; 
            
        
    // Get last segment of URL
    var url = $location.path();
    $scope.selectedUnit = url.substr(url.lastIndexOf('/') + 1); 

    // Add it to text button    
    $scope.unitCustomTexts = {buttonDefaultText:$scope.selectedUnit};
    
    $scope.redirectUnit = unitSelectionService.redirectUnit;
    
    $scope.unit1 = {
        id: 1, 
        label: 'Watt Hour', 
        marker: '', 
        cname: 'unit1',
        ticked: true,
        value: 0,
        factor: 1,
        type: ''
    };

    $scope.unit2 = {
        id: 2, 
        label: 'Erg',
        maker: 'kW', 
        cname: 'unit2', 
        ticked: false,
        value: 0,
        factor: 36000000000,
        type: ''
    };    

    $scope.unit3 = {
        id: 3, 
        label: 'Joule (watt second)', 
        maker: '', 
        cname: 'unit3',
        ticked: true,
        value: 0,
        factor: 3600,
        type: ''
    };
   
    $scope.unit4 = {
        id: 4, 
        label: 'Kilowatt Hour (KWH)', 
        marker: '', 
        cname: 'unit4',
        ticked: true,
        value: 0,
        factor: 0.001,
        type: ''
    };
    $scope.unit5 = {
        id: 5, 
        label: 'BTU', 
        marker: '', 
        cname: 'unit5', 
        ticked: false,
        value: 0,
        factor: 3.412141633,
        type: ''
    };

    $scope.unit6 = {
        id: 6, 
        label: 'Therm (US)', 
        marker: '', 
        cname: 'unit6', 
        ticked: false,
        value: 0,
        factor: 3.41296E-05,
        type: ''
    };
    $scope.unit7 = {
        id: 7, 
        label: 'Foot-pounds ', 
        marker: '', 
        cname: 'unit7', 
        ticked: false,
        value: 0,
        factor: 2655.223737,
        type: ''
    };
    $scope.unit8 = {
        id: 8, 
        label: 'Calorie (heat)', 
        marker: '', 
        cname: 'unit8', 
        ticked: false,
        value: 0,
        factor: 859.8452279,
        type: ''
    };
    $scope.unit9 = {
        id: 9, 
        label: 'Calorie (food)', 
        marker: '', 
        cname: 'unit9', 
        ticked: true,
        value: 0,
        factor: 0.859845228,
        type: ''
    };
   
    
    $scope.dataCollection = 
    [
        $scope.unit2, 
        $scope.unit3, 
        $scope.unit7,
        $scope.unit8,
        $scope.unit5,
        $scope.unit1,
        $scope.unit9,
        $scope.unit4,
        $scope.unit6        
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
    
    /*
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
   
    
     // Main unit
    $scope.$watch('unit1.value', function(){
        $scope.unit2.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit2.factor);
        $scope.unit3.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit3.factor);
        $scope.unit4.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit4.factor);
        $scope.unit5.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit5.factor); 
        $scope.unit6.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit6.factor); 
        $scope.unit7.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit7.factor);
        $scope.unit8.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit8.factor); 
        $scope.unit9.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit9.factor); 
    });
    */
    formatNumberFactory.precision = 10;
    $scope.calcHandler = function(obj, inputValue){

        var baseValue = $scope.convertToBaseUnit(inputValue, obj.factor);
        $scope.convertUnitsFromBase( baseValue );
    }

    $scope.convertToBaseUnit = function(value, factor){
        (math.bignumber($scope.unit5.value) / math.bignumber($scope.unit5.factor));

        return value/factor;
    }

    $scope.convertUnitsFromBase = function(baseUnitValue){
        $scope.unit1.value = formatNumberFactory.formatNumber(baseUnitValue);
        $scope.unit2.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit2.factor);
        $scope.unit3.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit3.factor);
        $scope.unit4.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit4.factor);
        $scope.unit5.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit5.factor);
        $scope.unit6.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit6.factor);
        $scope.unit7.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit7.factor);
        $scope.unit8.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit8.factor);
        $scope.unit9.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit9.factor);
    }

}]);
    
    
 
}());