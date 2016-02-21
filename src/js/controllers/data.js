(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('dataController', 
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
        label: 'Byte', 
        maker: 'B', 
        cname: 'unit1', 
        ticked: true,
        value: 0,
        factor: 1,
        type: ''
    };    
    $scope.unit2 = {
        id: 2, 
        label: 'Kilobyte', 
        maker: 'KB', 
        cname: 'unit2',
        ticked: true,
        value: 0,
        factor:0.000976563,
        type: ''
    };
    $scope.unit3 = {
        id: 3, 
        label: 'Megabyte', 
        marker: 'MB', 
        cname: 'unit3',
        ticked: true,
        value: 0,
        factor: 9.53674E-07,
        type: ''
    };
    $scope.unit4 = {
        id: 4, 
        label: 'Gigabyte', 
        marker: 'GB', 
        cname: 'unit4',
        ticked: true,
        value: 0,
        factor: 9.31323E-10,
        type: ''
    };
    $scope.unit5 = {
        id: 5, 
        label: 'Terabyte', 
        marker: 'TB', 
        cname: 'unit5', 
        ticked: true,
        value: 0,
        factor: 9.09495E-13,
        type: ''
    };
    $scope.unit6 = {
        id: 6, 
        label: 'Bit', 
        maker: 'b', 
        cname: 'unit6', 
        ticked: true,
        value: 0,
        factor: 6,
        type: ''
    };
    $scope.unit7 = {
        id: 7, 
        label: 'Nibble', 
        maker: '', 
        cname: 'unit7', 
        ticked: false,
        value: 0,
        factor: 2,
        type: ''
    };
    
    $scope.dataCollection = 
    [
        $scope.unit6,
        $scope.unit7,
        $scope.unit1, 
        $scope.unit2, 
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
        //$scope.unit1.value = math.divide(math.bignumber($scope.unit2.value), math.bignumber($scope.unit2.factor));
        //$scope.unit1.value = formatNumberFactory.formatNumber($scope.unit2.value / $scope.unit2.factor);
        if($scope.unit2.value){
            $scope.unit1.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit2.value) / math.bignumber($scope.unit2.factor));
        }
    });
    $scope.$watch('unit3.value', function(){
       // var val = formatNumberFactory.formatNumber($scope.unit3.value);
        //$scope.unit1.value = math.divide(math.bignumber($scope.unit3.value), math.bignumber($scope.unit3.factor));
        if($scope.unit3.value){
            $scope.unit1.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit3.value) / math.bignumber($scope.unit3.factor));
        }
    });
    $scope.$watch('unit4.value', function(){
        //$scope.unit1.value = formatNumberFactory.formatNumber($scope.unit4.value / $scope.unit4.factor);
        if($scope.unit4.value){
            $scope.unit1.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit4.value) / math.bignumber($scope.unit4.factor));
        }
    });
    $scope.$watch('unit5.value', function(){
       // $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit5.value / $scope.unit5.factor);
        if($scope.unit5.value){
            $scope.unit1.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit5.value) / math.bignumber($scope.unit5.factor));
        }
    });
    $scope.$watch('unit6.value', function(){
        //$scope.unit1.value = formatNumberFactory.formatNumber($scope.unit6.value / $scope.unit6.factor);
        if($scope.unit6.value){
            $scope.unit1.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit6.value) / math.bignumber($scope.unit6.factor));
        }
    });
    $scope.$watch('unit7.value', function(){
       // $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit7.value / $scope.unit7.factor);
        if($scope.unit7.value){
            $scope.unit1.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit7.value) / math.bignumber($scope.unit7.factor));
        }
    });
    
    
     // MAIN unit
    $scope.$watch('unit1.value', function(){
        //$scope.unit2.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit2.factor);
        if($scope.unit1.value){
            $scope.unit2.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit1.value) * math.bignumber($scope.unit2.factor));
            $scope.unit3.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit1.value) * math.bignumber($scope.unit3.factor));
            $scope.unit4.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit1.value) * math.bignumber($scope.unit4.factor));
            $scope.unit5.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit1.value) * math.bignumber($scope.unit5.factor));
            $scope.unit6.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit1.value) * math.bignumber($scope.unit6.factor));
            $scope.unit7.value = formatNumberFactory.formatNumber(math.bignumber($scope.unit1.value) * math.bignumber($scope.unit7.factor));
        }
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
    }

}]);
    
    
 
}());