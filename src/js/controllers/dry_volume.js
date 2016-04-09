(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('dryVolumeController', 
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
        label: 'Liter', 
        marker: '', 
        cname: 'unit1',
        ticked: true,
        value: 0,
        factor: 1,
        type: ''
    };

    $scope.unit2 = {
        id: 2, 
        label: 'Pint (dry)',
        maker: '', 
        cname: 'unit2', 
        ticked: true,
        value: 0,
        factor: 1.816165874,
        type: ''
    };    

    $scope.unit3 = {
        id: 3, 
        label: 'Quart (dry)', 
        maker: '', 
        cname: 'unit3',
        ticked: true,
        value: 0,
        factor: 0.908082937,
        type: ''
    };
   
    $scope.unit4 = {
        id: 4, 
        label: 'Peck', 
        marker: '', 
        cname: 'unit4',
        ticked: true,
        value: 0,
        factor: 0.113510367,
        type: ''
    };
    $scope.unit5 = {
        id: 5, 
        label: 'Bushel', 
        marker: '', 
        cname: 'unit5', 
        ticked: true,
        value: 0,
        factor: 0.028377592,
        type: ''
    };
   
    
    $scope.dataCollection = 
    [
        $scope.unit2, 
        $scope.unit1, 
        $scope.unit3, 
        $scope.unit4,
        $scope.unit5
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
   
    
     // MAIN unit
    $scope.$watch('unit1.value', function(){
        $scope.unit2.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit2.factor);
        $scope.unit3.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit3.factor);
        $scope.unit4.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit4.factor);
        $scope.unit5.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit5.factor); 
    });
    */
    formatNumberFactory.precision = 7;
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
    }

}]);
    
    
 
}());