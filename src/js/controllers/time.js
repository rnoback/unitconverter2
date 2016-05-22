(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('timeController', 
        ['$scope', '$filter', 'unitSelectionService', 'formatNumberFactory',
        function($scope, $filter, unitSelectionService, formatNumberFactory) {

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
    var url = document.URL;
    $scope.unit = url.substr(url.lastIndexOf('/') + 1); 
    // Add it to text button    
    $scope.unitCustomTexts = {buttonDefaultText:$scope.unit};
    
    $scope.redirectUnit = unitSelectionService.redirectUnit;
    
    $scope.unit1 = {
        id: 1, 
        label: 'Seconds', 
        maker: 's', 
        cname: 'unit1', 
        ticked: true,
        value: 0,
        factor: 1,
        type: ''
    };    
    $scope.unit2 = {
        id: 2, 
        label: 'Minutes', 
        maker: 'm', 
        cname: 'unit2',
        ticked: true,
        value: 0,
        factor:0.0166666666666667,
        type: ''
    };
    $scope.unit3 = {
        id: 3, 
        label: 'Hours', 
        marker: 'h', 
        cname: 'unit3',
        ticked: true,
        value: 0,
        factor: 2.777777777777778e-4,
        type: ''
    };
    $scope.unit4 = {
        id: 4, 
        label: 'Days', 
        marker: '', 
        cname: 'unit4',
        ticked: true,
        value: 0,
        factor: 1.15741E-05,
        type: ''
    };
    $scope.unit5 = {
        id: 5, 
        label: 'Weeks', 
        marker: '', 
        cname: 'unit5', 
        ticked: false,
        value: 0,
        factor: 1.65344E-06,
        type: ''
    };
    $scope.unit6 = {
        id: 6, 
        label: 'Fortnight', 
        maker: '', 
        cname: 'unit6', 
        ticked: false,
        value: 0,
        factor: 8.2672E-07,
        type: ''
    };
    $scope.unit7 = {
        id: 7, 
        label: 'Months (1/12th yr)', 
        maker: '(365 day, except for last 2)', 
        cname: 'unit7', 
        ticked: false,
        value: 0,
        factor: 3.80518E-07,
        type: ''
    };
    $scope.unit8 = {
        id: 8, 
        label: 'Year (365 day)', 
        maker: '', 
        cname: 'unit8', 
        ticked: false,
        value: 0,
        factor: 3.17098E-08,
        type: ''
    };
    $scope.unit9 = {
        id: 9, 
        label: 'Year (leap)', 
        maker: '', 
        cname: 'unit9', 
        ticked: false,
        value: 0,
        factor: 3.16232E-08,
        type: ''
    };
    $scope.unit10 = {
        id: 10, 
        label: 'Year (mean)', 
        maker: '', 
        cname: 'unit10', 
        ticked: false,
        value: 0,
        factor: 3.16888E-08,
        type: ''
    };
    $scope.unit11 = {
        id: 11, 
        label: 'Picosecond',
        maker: 'ps',
        cname: 'unit11',
        ticked: false,
        value: 0,
        factor: 1E+12,
        type: ''
    };
    $scope.unit12 = {
        id: 12, 
        label: 'Nanosecond',
        maker: 'ns',
        cname: 'unit12',
        ticked: false,
        value: 0,
        factor: 1000000000,
        type: ''
    };
    $scope.unit13 = {
        id: 13, 
        label: 'Microsecond',
        maker: 'us',
        cname: 'unit13',
        ticked: false,
        value: 0,
        factor: 1000000,
        type: ''
    };
    $scope.unit14 = {
        id: 14, 
        label: 'Millisecond', 
        maker: '',
        cname: 'unit14',
        ticked: false,
        value: 0,
        factor: 1000,
        type: ''
    };

    $scope.unit15 = {
        id: 15, 
        label: 'Hr:Min:Sec', 
        maker: '',
        cname: 'unit15',
        ticked: true,
        value: 0,
        value1: 0,
        value2: 0,
        factor: 2.777777777777778e-4,
        type: '',
        special: 'triple',
    };
    
    $scope.dataCollection = 
    [
        $scope.unit11,
        $scope.unit12,
        $scope.unit13,
        $scope.unit14,
        $scope.unit1, 
        $scope.unit2, 
        $scope.unit3, 
        $scope.unit15,
        $scope.unit4,
        $scope.unit5, 
        $scope.unit6,
        $scope.unit7,
        $scope.unit8,
        $scope.unit9,
        $scope.unit10
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
    

    formatNumberFactory.precision = 5;
    $scope.calcHandler = function(obj, inputValue, inputValue1, inputValue2){
        $scope.roundHours = false;
        if(obj.id > 3  && obj.id < 11 ){
            $scope.roundHours = true;
        }
        var baseValue;
        if(obj.special){
            var minToHour = math.divide(inputValue1, 60);
            var secToHour = math.divide(inputValue2, 3600);
            var totalHour = parseFloat(inputValue) + minToHour + secToHour;           
            baseValue = ( $scope.convertToBaseUnit(totalHour, obj.factor) );
        }else{ 
            baseValue = ( $scope.convertToBaseUnit(inputValue, obj.factor) );
        }
        $scope.convertUnitsFromBase( baseValue );
    }

    $scope.convertToBaseUnit = function(value, factor){
        return formatNumberFactory.formatNumber(value/factor);
    }

    $scope.convertUnitsFromBase = function(baseUnitValue){
        $scope.unit1.value = (baseUnitValue);
        $scope.unit2.value = formatNumberFactory.formatNumber2(baseUnitValue * $scope.unit2.factor);
        if($scope.roundHours){
            $scope.unit3.value = Math.ceil(formatNumberFactory.formatNumber2(baseUnitValue * $scope.unit3.factor));
        }else{
            $scope.unit3.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit3.factor);
        }
        $scope.unit4.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit4.factor);
        $scope.unit5.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit5.factor);
        $scope.unit6.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit6.factor);
        $scope.unit7.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit7.factor);
        $scope.unit8.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit8.factor);
        $scope.unit9.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit9.factor);
        $scope.unit10.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit10.factor);
        $scope.unit11.value = (baseUnitValue * $scope.unit11.factor);
        $scope.unit12.value = (baseUnitValue * $scope.unit12.factor);
        $scope.unit13.value = (baseUnitValue * $scope.unit13.factor);
        $scope.unit14.value = (baseUnitValue * $scope.unit14.factor);

        //aseUnitValue = formatNumberFactory.formatNumber(baseUnitValue);

        // to hours
        var toHours
        if($scope.roundHours){
            toHours = Math.ceil(math.multiply(baseUnitValue, $scope.unit15.factor));
        }else{
            toHours = (math.multiply(baseUnitValue, $scope.unit15.factor));
        }
        var restHours =  math.mod(toHours, 1);
        $scope.unit15.value = formatNumberFactory.formatNumber2(Math.floor(toHours));     
        var toMinutes = (math.multiply(restHours, 60));
        var restMinutes =   math.mod(toMinutes, 1); 
        var toSeconds = (math.multiply(restMinutes, 60));
        $scope.unit15.value1 = formatNumberFactory.formatNumber2(Math.floor(toMinutes));
        $scope.unit15.value2 = formatNumberFactory.formatNumber3(toSeconds);
    }
}]);
    
 
}());