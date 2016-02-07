(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('weightController', 
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
        label: 'Gram', 
        maker: 'g', 
        cname: 'unit1', 
        ticked: true,
        value: 0,
        factor: 1,
        type: 'Metric'
    };    
    $scope.unit2 = {
        id: 2, 
        label: 'Nanograms', 
        maker: 'ng', 
        cname: 'unit2',
        ticked: false,
        value: 0,
        factor:1000000000,
        type: 'Metric'
    };
    $scope.unit3 = {
        id: 3, 
        label: 'Micrograms', 
        marker: 'µg', 
        cname: 'unit3',
        ticked: false,
        value: 0,
        factor: 1000000,
        type: 'Metric'
    };
    $scope.unit4 = {
        id: 4, 
        label: 'Milligrams', 
        marker: 'mg', 
        cname: 'unit4',
        ticked: true,
        value: 0,
        factor: 1000,
        type: 'Metric'
    };
    $scope.unit5 = {
        id: 5, 
        label: 'Centigrams', 
        marker: 'cg', 
        cname: 'unit5', 
        ticked: false,
        value: 0,
        factor: 100,
        type: 'Metric'
    };
    $scope.unit6 = {
        id: 6, 
        label: 'Decigrams', 
        maker: 'dg', 
        cname: 'unit6', 
        ticked: false,
        value: 0,
        factor: 10,
        type: 'Metric'
    };
    $scope.unit7 = {
        id: 7, 
        label: 'Dekagrams', 
        maker: 'dag', 
        cname: 'unit7', 
        ticked: false,
        value: 0,
        factor: 0.1,
        type: 'Metric'
    };
    $scope.unit8 = {
        id: 8, 
        label: 'Hectograms', 
        maker: 'hg', 
        cname: 'unit8', 
        ticked: false,
        value: 0,
        factor: 0.01,
        type: 'Metric'
    };
    $scope.unit9 = {
        id: 9, 
        label: 'Kilograms', 
        maker: 'kg', 
        cname: 'unit9', 
        ticked: true,
        value: 0,
        factor: 0.001,
        type: 'Metric'
    };
    $scope.unit10 = {
        id: 10, 
        label: 'Tonnes', 
        maker: 't', 
        cname: 'unit10', 
        ticked: true,
        value: 0,
        factor: 0.000001,
        type: 'Metric'
    };
    $scope.unit11 = {
        id: 11, 
        label: 'Kilotonnes', 
        maker: 'kt', 
        cname: 'unit11', 
        ticked: false,
        value: 0,
        factor: 0.000000001,
        type: 'Metric'
    };
    $scope.unit12 = {
        id: 12, 
        label: 'Megatonnes',
        maker: '',
        cname: 'unit12',
        ticked: false,
        value: 0,
        factor: 0.000000000001,
        type: 'Metric'
    };
    $scope.unit13 = {
        id: 13, 
        label: 'Ounces',
        maker: 'oz',
        cname: 'unit13',
        ticked: true,
        value: 0,
        factor: 0.035273962,
        type: 'Imperial'
    };
    $scope.unit14 = {
        id: 14, 
        label: 'Pounds',
        maker: 'lb',
        cname: 'unit14',
        ticked: true,
        value: 0,
        factor: 0.002204623,
        type: 'Imperial'
    };
    $scope.unit15 = {
        id: 15, 
        label: 'Stones (UK)', 
        maker: '',
        cname: 'unit15',
        ticked: false,
        value: 0,
        factor: 0.000157473,
        type: ''
    };
    $scope.unit16 = {
        id: 16, 
        label: 'Cental',
        maker: '',
        cname: 'unit16',
        ticked: false,
        value: 0,
        factor: 0.000022046226218487758,
        type: ''
    };
    $scope.unit17 = {
        id: 17, 
        label: 'Tons (US)',
        maker: '',
        cname: 'unit17',
        ticked: false,
        value: 0,
        factor: 0.000001102,
        type: 'Imperial'
    };
    $scope.unit18 = {
        id: 18, 
        label: 'Tons (UK)',
        maker: '',
        cname: 'unit18',
        ticked: false,
        value: 0,
        factor: 0.000000984,
        type: ''
    };
    $scope.unit19 = {
        id: 19, 
        label: 'Grains',
        maker: '',
        cname: 'unit19',
        ticked: false,
        value: 0,
        factor: 15.4323583529,
        type: 'Imperial'
    };
    $scope.unit20 = {
        id: 20, 
        label: 'Carats',
        maker: 'ct',
        cname: 'unit20',
        ticked: false,
        value: 0,
        factor: 0.771617918,
        type: ''
    };
    $scope.unit21 = {
        id: 21, 
        label: 'Ounces Troy',
        maker: '',
        cname: 'unit21',
        ticked: false,
        value: 0,
        factor: 0.032150747,
        type: 'Troy'
    };
    $scope.unit22 = {
        id: 22, 
        label: 'Pounds Troy',
        maker: '',
        cname: 'unit22',
        ticked: false,
        value: 0,
        factor: 0.002679229,
        type: 'Troy'
    };
    
    $scope.unit23 = {
        id: 23, 
        label: 'Slugs',
        maker: '',
        cname: 'unit23',
        ticked: false,
        value: 0,
        factor: 0.000068522,
        type: ''
    };
    $scope.unit24 = {
        id: 24, 
        label: 'Earth Mass',
        maker: '',
        cname: 'unit24',
        ticked: false,
        value: 0,
        factor: 0.0000000000000000000000000001673360107,
        type: ''
    };
    
    $scope.unit25 = {
        id: 25, 
        label: 'Solar Mass',
        maker: '',
        cname: 'unit25',
        ticked: false,
        value: 0,
        factor: 0.0000000000000000000000000000000005,
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
        $scope.unit25
    ];
    



    // collapse window => needs to go in a directive
    $scope.windowOpen = true;
    
    $('.btn-collapse-window').on('click', function(){
        if($scope.windowOpen) {
            $(this).find('span').removeClass('fa-chevron-down');
            $(this).find('span').addClass('fa-chevron-up');
            $('.box-body').hide();
            $('.units-dropdown').hide();
            $('.dropdown-multiselect').hide();
            $scope.windowOpen = false;
        }else{
            $(this).find('span').addClass('fa-chevron-down');
            $(this).find('span').removeClass('fa-chevron-up');
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
    });

}]);
    
    
 
}());