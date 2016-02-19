(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('angleController', 
        ['$scope', '$filter', 'unitSelectionService', 'formatNumberFactory',
        function($scope, $filter, unitSelectionService, formatNumberFactory) {

    $scope.unitsCollection = unitSelectionService.units;
    $scope.defaultButtonText = unitSelectionService.defaultButtonText; 
    
    $scope.unitsModel = {};
    $scope.unitsSettings = { 
        selectionLimit: 1,
        showUncheckAll: false,
        showCheckAll: false
    }; 
            
        
    // Get last segment of URL
    var url = document.URL;
    $scope.unit = url.substr(url.lastIndexOf('/') + 1); 
    // Add it to text button    
    $scope.unitCustomTexts = {buttonDefaultText:$scope.unit};
    
    $scope.redirectUnit = unitSelectionService.redirectUnit;
    

    $scope.unit1 = {
        id: 1, 
        label: 'Degrees', 
        maker: '', 
        cname: 'unit1', 
        ticked: true,
        value: 0,
        factor: 1,
        type: ''
    };    
    $scope.unit2 = {
        id: 2, 
        label: 'Radians', 
        maker: '', 
        cname: 'unit2',
        ticked: true,
        value: 0,
        factor: 0.017453292519943295, // (Math.PI/180)
        type: ''
    };
    $scope.unit3 = {
        id: 3, 
        label: 'Hours', 
        marker: '', 
        cname: 'unit3',
        ticked: true,
        value: 0,
        factor: 0.03333333333333333, // (12/360)
        type: ''
    };
    
   
    $scope.dataCollection = 
    [
        $scope.unit1, 
        $scope.unit2, 
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
    
    /*
    
    $scope.$watch('unit2.value', function(){
        if($scope.unit2.value){
            $scope.unit1.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit2.value) / math.bignumber(Math.PI/180));
        }
        //$scope.unit1.value = formatNumberFactory.formatNumber($scope.unit2.value / (Math.PI/180));
    });
    $scope.$watch('unit3.value', function(){
        if($scope.unit3.value){
            $scope.unit1.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit3.value) / math.bignumber(12/360));
        }
        //$scope.unit1.value = formatNumberFactory.formatNumber($scope.unit3.value / (12/360));
    });
    
    
    
     // MAIN unit
    $scope.$watch('unit1.value', function(){
        //$scope.unit2.value = formatNumberFactory.formatNumber($scope.unit1.value * (Math.PI/180));
        //$scope.unit3.value = formatNumberFactory.formatNumber($scope.unit1.value * (12/360));


        if($scope.unit1.value){
            $scope.unit2.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit1.value) * math.bignumber(Math.PI/180));
            $scope.unit3.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit1.value) * math.bignumber(12/360));
        }
    });
    */

    $scope.calcHandler = function(obj, inputValue){
        var baseValue = $scope.convertToBaseUnit(inputValue, obj.factor);
        $scope.convertUnitsFromBase( baseValue );
    }

    $scope.convertToBaseUnit = function(value, factor){
        return value/factor;
    }

    $scope.convertUnitsFromBase = function(baseUnitValue){
        $scope.unit1.value = formatNumberFactory.formatNumber(baseUnitValue);
        $scope.unit2.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit2.factor);
        $scope.unit3.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit3.factor);
    }

}]);
    
    
 
}());