(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('currencyController', 
        ['$scope', '$filter', '$location', '$resource', 'unitSelectionService', 'currencyValueFactory', 'formatNumberFactory',
        function($scope, $filter, $location, $resource, unitSelectionService, currencyValueFactory, formatNumberFactory) {

    $scope.unitsCollection = unitSelectionService.units;
    $scope.defaultButtonText = unitSelectionService.defaultButtonText; 

    $scope.unitsModel = {};
    $scope.currencyValues = {};

    $scope.unitsSettings = { 
        selectionLimit: 1,
        showUncheckAll: false,
        showCheckAll: false
    }; 
            
    // get current selected unit    
    var url = $location.path();
    $scope.selectedUnit = url.substr(url.lastIndexOf('/') + 1); 

    // Add it to text button    
    $scope.unitCustomTexts = {buttonDefaultText:$scope.selectedUnit};
    $scope.redirectUnit = unitSelectionService.redirectUnit;
    

    currencyValueFactory.then(function successCallback(response) {
        $scope.currencyValues = response.data.rates;
        parseData($scope.currencyValues);

    }, function errorCallback(response) {
        console.log("something went wrong " + response);
    });
    

   // $scope.currencyValues = $resource('http://api.fixer.io/latest?base=EUR', {callback: "JSON_CALLBACK"}, {get:{method: "JSONP" }}  );

       
    function parseData(data){

        $scope.unit1 = {
            id: 1, 
            label: 'Euro', 
            maker: 'EUR', 
            cname: 'unit1', 
            ticked: true,
            value: 0,
            factor: 1,
            type: ''
        };    
        $scope.unit2 = {
            id: 2, 
            label: 'Australian Dollar', 
            maker: 'AUD', 
            cname: 'unit2',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        
        $scope.unit3 = {
            id: 3, 
            label: 'Bulgarian Lev', 
            maker: 'BGN', 
            cname: 'unit3', 
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };

         $scope.unit4 = {
            id: 4, 
            label: 'Brazilian Real', 
            maker: 'BRL', 
            cname: 'unit4', 
            ticked: true,
            value: 0,
            factor: 1,
            type: ''
        };
        
         $scope.unit5 = {
            id: 5, 
            label: 'Canadian Dollar',
            maker: 'CAD',
            cname: 'unit5',
            ticked: true,
            value: 0,
            factor: 1,
            type: ''
        };

        $scope.unit6 = {
            id: 6, 
            label: 'Swiss Franc',
            maker: 'CHF',
            cname: 'unit6',
            ticked: false,
            value: 0,
            factor: 1 ,
            type: ''
        };
        $scope.unit7 = {
            id: 7, 
            label: 'China Yuan Renminbi',
            maker: 'CNY',
            cname: 'unit7',
            ticked: true,
            value: 0,
            factor: 1,
            type: ''
        };
        
        $scope.unit8 = {
            id: 8, 
            label: 'Czech Koruna',
            maker: 'CZK',
            cname: 'unit8',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit9 = {
            id: 9, 
            label: 'Danish Krone',
            maker: 'DKK',
            cname: 'unit9',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        
        $scope.unit10 = {
            id: 10, 
            label: 'UK Pound Sterling',
            maker: 'GBP',
            cname: 'unit10',
            ticked: true,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit11 = {
            id: 11, 
            label: 'Hong Kong Dollar',
            maker: 'HKD',
            cname: 'unit11',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit12 = {
            id: 12, 
            label: 'Croatian Kuna',
            maker: 'HRK',
            cname: 'unit12',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit13 = {
            id: 13, 
            label: 'Hungarian Forint',
            maker: 'HUF',
            cname: 'unit13',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit14 = {
            id: 14, 
            label: 'Indonesian Rupiah',
            maker: 'IDR',
            cname: 'unit14',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit15 = {
            id: 15, 
            label: 'Israeli New Shekel',
            maker: 'ILS',
            cname: 'unit15',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit16 = {
            id: 16, 
            label: 'Indian Rupee',
            maker: 'INR',
            cname: 'unit16',
            ticked: false,
            value: 0,
            factor: 1,
            type: 'Imperial Fluid'
        };
        $scope.unit17 = {
            id: 17, 
            label: 'Japanese Yen',
            maker: 'JPY',
            cname: 'unit17',
            ticked: true,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit18 = {
            id: 18, 
            label: 'Korean Won',
            maker: 'KRW',
            cname: 'unit18',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit19 = {
            id: 19, 
            label: 'Mexican Nuevo Peso',
            maker: 'MXN',
            cname: 'unit19',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit20 = {
            id: 20, 
            label: 'Malaysian Ringgit',
            maker: 'MYR',
            cname: 'unit20',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit21 = {
            id: 21, 
            label: 'Norwegian Krone',
            maker: 'NOK',
            cname: 'unit21',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit22 = {
            id: 22, 
            label: 'New Zealand Dollar',
            maker: 'NZD',
            cname: 'unit22',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit23 = {
            id: 23, 
            label: 'Philippine Peso',
            maker: 'PHP',
            cname: 'unit23',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit24 = {
            id: 24, 
            label: 'Polish Zloty',
            maker: 'PLN',
            cname: 'unit24',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit25 = {
            id: 25, 
            label: 'Romanian New Leu',
            maker: 'RON',
            cname: 'unit25',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit26 = {
            id: 26, 
            label: 'Russian Ruble',
            maker: 'RON',
            cname: 'unit26',
            ticked: true,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit27 = {
            id: 27, 
            label: 'Swedish Krona',
            maker: 'SEK',
            cname: 'unit27',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit28 = {
            id: 28, 
            label: 'Singapore Dollar',
            maker: 'SGD',
            cname: 'unit28',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit29 = {
            id: 29, 
            label: 'Thai Baht',
            maker: 'THB',
            cname: 'unit29',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit30 = {
            id: 30, 
            label: 'Turkish Lira',
            maker: 'TRY',
            cname: 'unit30',
            ticked: false,
            value: 0,
            factor: 1,
            type: ''
        };
        $scope.unit31 = {
            id: 31, 
            label: 'US Dollar',
            maker: 'USD',
            cname: 'unit31',
            ticked: true,
            value: 0,
            factor: 1,
            type: ''
        };
         $scope.unit32 = {
            id: 32, 
            label: 'South African Rand',
            maker: 'ZAR',
            cname: 'unit32',
            ticked: false,
            value: 0,
            factor: 1,
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
            $scope.unit14,
            $scope.unit15,
            $scope.unit16,
            $scope.unit17,
            $scope.unit18,
            $scope.unit19,
            $scope.unit20,
            $scope.unit21,
            $scope.unit22,
            $scope.unit23,
            $scope.unit24,
            $scope.unit25,
            $scope.unit26,
            $scope.unit27,
            $scope.unit28,
            $scope.unit29,
            $scope.unit30,
            $scope.unit31,
            $scope.unit32
        ];


    
        
        // Add (3-th party) values to units
        $.each($scope.dataCollection, function(key, val) {
            if(val){
                val.factor = $scope.currencyValues[val.maker];
            }
        });



        //Filter Collection
        //$scope.dataCollection = $filter('orderBy')($scope.dataCollection, 'type');
        
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
            //var val = math.number($scope.unit5.value);
           // var fac = parseFloat($scope.unit5.factor);
           // console.log(fac);
           // $scope.unit1.value = formatNumberFactory.formatNumber(math.divide(math.bignumber(1), math.bignumber(1)));
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


        $scope.$watch('unit18.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit18.value / $scope.unit18.factor);
        });
        $scope.$watch('unit19.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit19.value / $scope.unit19.factor);
        });
        $scope.$watch('unit20.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit20.value / $scope.unit20.factor);
        });
        $scope.$watch('unit21.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit21.value / $scope.unit21.factor);
        });
        $scope.$watch('unit22.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit22.value / $scope.unit22.factor);
        });
        $scope.$watch('unit23.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit23.value / $scope.unit23.factor);
        });
        $scope.$watch('unit24.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit24.value / $scope.unit24.factor);
        });
        $scope.$watch('unit25.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit25.value / $scope.unit25.factor);
        });
        $scope.$watch('unit26.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit26.value / $scope.unit26.factor);
        });
        $scope.$watch('unit27.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit27.value / $scope.unit27.factor);
        });
        $scope.$watch('unit28.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit28.value / $scope.unit28.factor);
        });
        $scope.$watch('unit29.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit29.value / $scope.unit29.factor);
        });
        $scope.$watch('unit30.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit30.value / $scope.unit30.factor);
        });
        $scope.$watch('unit31.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit31.value / $scope.unit31.factor);
        });
        $scope.$watch('unit32.value', function(){
            $scope.unit1.value = formatNumberFactory.formatNumber($scope.unit32.value / $scope.unit32.factor);
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
            $scope.unit18.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit18.factor);
            $scope.unit19.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit19.factor);
            $scope.unit20.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit20.factor);
            $scope.unit21.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit21.factor);
            $scope.unit22.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit22.factor);
            $scope.unit23.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit23.factor);
            $scope.unit24.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit24.factor);
            $scope.unit25.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit25.factor);
            $scope.unit26.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit26.factor);
            $scope.unit27.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit27.factor);
            $scope.unit28.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit28.factor);
            $scope.unit29.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit29.factor);
            $scope.unit30.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit30.factor);
            $scope.unit31.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit31.factor);
            $scope.unit32.value = formatNumberFactory.formatNumber($scope.unit1.value * $scope.unit32.factor);
        });

        */
        formatNumberFactory.precision = 10;
        $scope.calcHandler = function(obj, inputValue){
            //hack, to get EUR a factor. Euro is not in feed and manually added, probably causes this bug.
            if(obj.factor === undefined){
                obj.factor = 1;
            }
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
            $scope.unit4.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit4.factor);
            $scope.unit5.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit5.factor);
            $scope.unit6.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit6.factor);
            $scope.unit7.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit7.factor);
            $scope.unit8.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit8.factor);
            $scope.unit9.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit9.factor);
            $scope.unit10.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit10.factor);
            $scope.unit11.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit11.factor);
            $scope.unit12.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit12.factor);

            $scope.unit13.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit13.factor);
            $scope.unit14.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit14.factor);
            $scope.unit15.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit15.factor);
            $scope.unit16.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit16.factor);
            $scope.unit17.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit17.factor);
            $scope.unit18.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit18.factor);
            $scope.unit19.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit19.factor);
            $scope.unit20.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit10.factor);
            $scope.unit21.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit11.factor);
            $scope.unit22.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit12.factor);

            $scope.unit23.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit23.factor);
            $scope.unit24.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit24.factor);
            $scope.unit25.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit25.factor);
            $scope.unit26.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit26.factor);
            $scope.unit27.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit27.factor);
            $scope.unit28.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit28.factor);
            $scope.unit29.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit29.factor);
            $scope.unit30.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit30.factor);
            $scope.unit31.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit31.factor);
            $scope.unit32.value = formatNumberFactory.formatNumber(baseUnitValue * $scope.unit32.factor);
        }
    
    }
    parseData($scope.currencyValues);
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
}]);
    
    
 
}());