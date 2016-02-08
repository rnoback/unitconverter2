(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('areaController', 
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
        label: 'Sq Meters',
        maker: '', 
        cname: 'unit1', 
        ticked: true,
        value: 0,
        factor: 1,
        type: 'Metric'
    };    
    $scope.unit2 = {
        id: 2, 
        label: 'Sq Centimeters', 
        maker: '', 
        cname: 'unit2',
        ticked: false,
        value: 0,
        factor: 10000,
        type: 'Metric'
    };
    $scope.unit3 = {
        id: 3, 
        label: 'Sq Millimeters', 
        marker: '', 
        cname: 'unit3',
        ticked: false,
        value: 0,
        factor: 1000000,
        type: 'Metric'
    };
    $scope.unit4 = {
        id: 4, 
        label: 'Sq Microns', 
        marker: '', 
        cname: 'unit4',
        ticked: false,
        value: 0,
        factor: 1000000000000,
        type: 'Metric'
    };
    $scope.unit5 = {
        id: 5, 
        label: 'Sq Kilometers', 
        marker: '', 
        cname: 'unit5', 
        ticked: true,
        value: 0,
        factor: 0.000001,
        type: 'Metric'
    };
    $scope.unit6 = {
        id: 6, 
        label: 'Hectares', 
        maker: '', 
        cname: 'unit6', 
        ticked: true,
        value: 0,
        factor: 0.0001,
        type: 'Metric'
    };
    $scope.unit7 = {
        id: 7, 
        label: 'Sq Mils', 
        maker: '', 
        cname: 'unit7', 
        ticked: false,
        value: 0,
        factor: 1550003100,
        type: 'Imperial'
    };
    $scope.unit8 = {
        id: 8, 
        label: 'Sq Inches', 
        maker: 'sq in', 
        cname: 'unit8', 
        ticked: false,
        value: 0,
        factor: 1550.0031,
        type: 'Imperial'
    };
    $scope.unit9 = {
        id: 9, 
        label: 'Sq Feet', 
        maker: '', 
        cname: 'unit9', 
        ticked: true,
        value: 0,
        factor: 10.76391042,
        type: 'Imperial'
    };
    $scope.unit10 = {
        id: 10, 
        label: 'Sq Yards', 
        maker: '', 
        cname: 'unit10', 
        ticked: false,
        value: 0,
        factor: 1.195990046,
        type: 'Imperial'
    };
    $scope.unit11 = {
        id: 11, 
        label: 'Sq Miles', 
        maker: '', 
        cname: 'unit11', 
        ticked: true,
        value: 0,
        factor: 0.0000000386102,
        type: 'Imperial'
    };
    $scope.unit12 = {
        id: 12, 
        label: 'Acre',
        maker: '',
        cname: 'unit12',
        ticked: true,
        value: 0,
        factor: 0.000247104,
        type: 'Imperial'
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
        $scope.unit12
    ];

    // collapse window => needs to go in a directive
    $scope.windowOpen = true;
    
    $('.btn-collapse-window').on('click', function(){
        if($scope.windowOpen) {
            $(this).find('span').removeClass('fa-chevron-down');
            $(this).find('span').addClass('fa-chevron-up');
            $(this).addClass('collapsed');
            $('.box-body').hide();
            $('.units-dropdown').hide();
            $('.dropdown-multiselect').hide();
            $scope.windowOpen = false;
        }else{
            $(this).find('span').addClass('fa-chevron-down');
            $(this).find('span').removeClass('fa-chevron-up');
            $(this).removeClass('collapsed');
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
 
    });
    
   

}]);
    
    
 
}());