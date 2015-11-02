(function () {
    /*jshint -W071 */
    'use strict';
    var converterApp  = angular.module('converterApp');
    
    converterApp.controller('lengthController', 
        ['$scope', '$filter', 'unitSelectionService', 
        function($scope, $filter, unitSelectionService){
   
    $scope.unitsCollection = unitSelectionService.units;
    
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
    
    
    $scope.onTextClick = function ( $event ) {
        $event.target.select();
    };
    
            
    $scope.unit1 = {
        id: 1, 
        label: 'Angstroms', 
        maker: 'Å', 
        cname: 'unit1',
        ticked: false,
        value: 0,
        factor:10000000000
    };
    $scope.unit2 = {
        id: 2, 
        label: 'Astronomical units', 
        marker: 'au', 
        cname: 'unit2',
        ticked: false,
        value: 0,
        factor: 149600000000
    };
    $scope.unit3 = {
        id: 3, 
        label: 'Barleycorns', 
        marker: '', 
        cname: 'unit3',
        ticked: false,
        value: 0,
        factor: 117.6470588235294
    };
    $scope.unit4 = {
        id: 4, 
        label: 'Cables', 
        marker: '', 
        cname: 'unit4', 
        ticked: false,
        value: 0,
        factor: 0.005396118248376848
    };
    $scope.unit5 = {
        id: 5, 
        label: 'Centimeters', 
        maker: 'cm', 
        cname: 'unit5', 
        ticked: true,
        value: 0,
        factor: 100
    };
    $scope.unit6 = {
        id: 6, 
        label: 'Chains', 
        maker: '', 
        cname: 'unit6', 
        ticked: false,
        value: 0,
        factor: 0.03280839895013123
    };
    $scope.unit7 = {
        id: 7, 
        label: 'Decimeters', 
        maker: '', 
        cname: 'unit7', 
        ticked: true,
        value: 0,
        factor: 10
    };
    $scope.unit8 = {
        id: 8, 
        label: 'Ells', 
        maker: '', 
        cname: 'unit8', 
        ticked: false,
        value: 0,
        factor: 0.874890639
    };
    $scope.unit9 = {
        id: 9, 
        label: 'Fathoms', 
        maker: '', 
        cname: 'unit9', 
        ticked: false,
        value: 0,
        factor: 0.5468066491688539
    };
    $scope.unit10 = {
        id: 10, 
        label: 'Feet UK', 
        maker: 'ft', 
        cname: 'unit10', 
        ticked: true,
        value: 0,
        factor: 3.280839895
    };
    $scope.unit11 = {
        id: 11, 
        label: 'Feet (US survey)', 
        maker: 'ft', 
        cname: 'unit11', 
        ticked: false,
        value: 0,
        factor: 3.280833333
    };
    $scope.unit12 = {
        id: 12, 
        label: 'Furlongs',
        maker: '',
        cname: 'unit12',
        ticked: false,
        value: 0,
        factor: 0.00497095959596
    };
    $scope.unit13 = {
        id: 13, 
        label: 'Hands',
        maker: '',
        cname: 'unit13',
        ticked: false,
        value: 0,
        factor: 9.84251968503937
    };
    $scope.unit14 = {
        id: 14, 
        label: 'Hectometers',
        maker: '',
        cname: 'unit14',
        ticked: false,
        value: 0,
        factor: 0.01
    };
    $scope.unit15 = {
        id: 15, 
        label: 'Inches', 
        maker: 'in',
        cname: 'unit15',
        ticked: true,
        value: 0,
        factor: 39.37007874
    };
    $scope.unit16 = {
        id: 16, 
        label: 'Kilometers',
        maker: 'km',
        cname: 'unit16',
        ticked: true,
        value: 0,
        factor: 0.001
    };
    $scope.unit17 = {
        id: 17, 
        label: 'League (nautical)',
        maker: '',
        cname: 'unit17',
        ticked: false,
        value: 0,
        factor: 0.000207123314614
    };
    $scope.unit18 = {
        id: 18, 
        label: 'Light years',
        maker: '',
        cname: 'unit18',
        ticked: false,
        value: 0,
        factor: 0.00000000000000011
    };
    $scope.unit19 = {
        id: 19, 
        label: 'Meters',
        maker: 'm',
        cname: 'unit19',
        ticked: true,
        value: 0,
        factor: 1
    };
    $scope.unit20 = {
        id: 20, 
        label: 'Micrometers',
        maker: '',
        cname: 'unit20',
        ticked: false,
        value: 0,
        factor: 1000000
    };
    $scope.unit21 = {
        id: 21, 
        label: 'Mil',
        maker: '',
        cname: 'unit21',
        ticked: false,
        value: 0,
        factor: 39370.07874015748
    };
    $scope.unit22 = {
        id: 22, 
        label: 'Miles',
        maker: 'mi',
        cname: 'unit22',
        ticked: true,
        value: 0,
        factor: 0.000621371192237
    };
    
    $scope.unit23 = {
        id: 23, 
        label: 'Miles (nautical)',
        maker: '',
        cname: 'unit23',
        ticked: false,
        value: 0,
        factor: 0.0005399568034557
    };
    $scope.unit24 = {
        id: 24, 
        label: 'Miles (UK nautical)',
        maker: '',
        cname: 'unit24',
        ticked: false,
        value: 0,
        factor: 0.0005396118248377
    };
    
    $scope.unit25 = {
        id: 25, 
        label: 'Millimeters',
        maker: 'mm',
        cname: 'unit25',
        ticked: false,
        value: 0,
        factor: 1000
    };
    $scope.unit26 = {
        id: 26, 
        label: 'Nanometers',
        maker: 'nm',
        cname: 'unit26',
        ticked: false,
        value: 0,
        factor: 1000000000
    };
    $scope.unit27 = {
        id: 27, 
        label: 'Parsecs',
        maker: 'pc',
        cname: 'unit27',
        ticked: false,
        value: 0,
        factor: 3.2407792900000000
    };
    $scope.unit28 = {
        id: 28, 
        label: 'Picometers',
        maker: 'pm',
        cname: 'unit28',
        ticked: false,
        value: 0,
        factor: 1000000000000
    };
    $scope.unit29 = {
        id: 29, 
        label: 'Scandinavian Miles',
        maker: '',
        cname: 'unit29',
        ticked: false,
        value: 0,
        factor: 0.0001
    };
    $scope.unit30 = {
        id: 30, 
        label: 'Thou',
        maker: '',
        cname: 'unit30',
        ticked: false,
        value: 0,
        factor: 39370.07874015748
    };
    
    $scope.unit31 = {
        id: 31, 
        label: 'Yards',
        maker: 'yd',
        cname: 'unit31',
        ticked: true,
        value: 0,
        factor: 1.0936132983377078
    };
    
    
    
    $scope.lengthData = 
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
        $scope.unit31
    ];
    
    
    
        
    //Filter Collection
    $scope.lengthData = $filter('orderBy')($scope.lengthData, 'label');
        

    
    
    // Setup frequently used units
    $scope.lengthModel = [];
    $scope.lengthModel = (function(){
        var arr = [];
        for(var i=0; i<$scope.lengthData.length; i++){
             if($scope.lengthData[i].ticked){
                 arr.push({id:$scope.lengthData[i].id});
            }
        }
        return arr;
     })();        
       
    
    $scope.lengthSettings = { 
        enableSearch: false,
        scrollableHeight: '400px',
        scrollable: true,
        externalIdProp: ''
    }; 

    $scope.lengthCustomTexts = {buttonDefaultText: 'Length'};
    
    $scope.unitsTicked = [];
    
    $scope.getTickedUnits = function(){
        for(var i=0; i<$scope.lengthData.length; i++){
            if($scope.lengthData[i].ticked){
                $scope.unitsTicked.push($scope.lengthData[i]);
            }
        }
    };
    
    $scope.setAllUnits = function(){
         for(var i=0; i<$scope.lengthData.length; i++){
             $scope.unitsTicked.push($scope.lengthData[i]);
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
    
    /* $scope.lengthData.some(function(ld) {
            console.log( ld.label );
            
         if(ld.id == 5 ){
             $scope.cm = {
                id: ld.id,
                name: ld.label,
                maker: ld.maker,
                cname: ld.cname,
                ticked: ld.ticked,
                factor: ld.factor,
                value: 0
            };
         }
        });
    
    console.log($scope.cm);
    */
    
    /*
    $scope.initCalculatiuons = function(){
        
        console.log($scope.lengthData.length);
        
        for(i=0; i<$scope.lengthData.length; i++){
            
            var cname = $scope.lengthData[i].cname;
            var value = $scope.lengthData[i].value;
            var factor = $scope.lengthData[i].factor;
            var nameValueString = cname +'.value';
            

           // console.log('nameValueString '+nameValueString);
            
            if(i != 18){
                
                $scope.$watch(nameValueString, function(){
                    //$scope.unit19.value = formatFloat(value / factor);
                     
                });
            }else{
                
            }       
        }
    }
    
    
    $scope.initCalculatiuons();
    */
    
    
    
    // Angstroms
    $scope.$watch('unit1.value', function(){
        $scope.unit19.value = formatFloat($scope.unit1.value / $scope.unit1.factor);
    });
    // Astronomical units
    $scope.$watch('unit2.value', function(){
        $scope.unit19.value = formatFloat($scope.unit2.value / $scope.unit2.factor);
    });
    // Barley corns
    $scope.$watch('unit3.value', function(){
        $scope.unit19.value = formatFloat($scope.unit3.value / $scope.unit3.factor);
    });
    // Cables
    $scope.$watch('unit4.value', function(){
        $scope.unit19.value = formatFloat($scope.unit4.value / $scope.unit4.factor);
    });
    // Centimers
    $scope.$watch('unit5.value', function(){
        $scope.unit19.value = formatFloat($scope.unit5.value / $scope.unit5.factor);
    });
    // Chains
    $scope.$watch('unit6.value', function(){
        $scope.unit19.value = formatFloat($scope.unit6.value / $scope.unit6.factor);
    });
    // Decimeters
    $scope.$watch('unit7.value', function(){
        $scope.unit19.value = formatFloat($scope.unit7.value / $scope.unit7.factor);
    });
    // Ells
    $scope.$watch('unit8.value', function(){
        $scope.unit19.value = formatFloat($scope.unit8.value / $scope.unit8.factor);
    });
    // Fathoms
    $scope.$watch('unit9.value', function(){
        $scope.unit19.value = formatFloat($scope.unit9.value / $scope.unit9.factor);
    });
    // Feet UK
    $scope.$watch('unit10.value', function(){
        $scope.unit19.value = formatFloat($scope.unit10.value / $scope.unit10.factor);
    });
    // Feet (US survey)
    $scope.$watch('unit11.value', function(){
        $scope.unit19.value = formatFloat($scope.unit11.value / $scope.unit11.factor);
    });
    // Furlongs (US survey)
    $scope.$watch('unit12.value', function(){
        $scope.unit19.value = formatFloat($scope.unit12.value / $scope.unit12.factor);
    });
    // Hands
    $scope.$watch('unit13.value', function(){
        $scope.unit19.value = formatFloat($scope.unit13.value / $scope.unit13.factor);
    });
    // Hectometers
    $scope.$watch('unit14.value', function(){
        $scope.unit19.value = formatFloat($scope.unit14.value / $scope.unit14.factor);
    });
    // Inches
    $scope.$watch('unit15.value', function(){
        $scope.unit19.value = formatFloat($scope.unit15.value / $scope.unit15.factor);
    });
    // Kilometers
    $scope.$watch('unit16.value', function(){
        $scope.unit19.value = formatFloat($scope.unit16.value / $scope.unit16.factor);
    });
    // League
    $scope.$watch('unit17.value', function(){
        $scope.unit19.value = formatFloat($scope.unit17.value / $scope.unit17.factor);
    });
    // Light Years
    $scope.$watch('unit18.value', function(){
        $scope.unit19.value = formatFloat($scope.unit18.value / $scope.unit18.factor);
    });
    
    //Unit 19 meters is main unit see down

    // Micrometers
    $scope.$watch('unit20.value', function(){
        $scope.unit19.value = formatFloat($scope.unit20.value / $scope.unit20.factor);
    });
    // Mil
    $scope.$watch('unit21.value', function(){
        $scope.unit19.value = formatFloat($scope.unit21.value / $scope.unit21.factor);
    });
    // Miles  
    $scope.$watch('unit22.value', function(){
        $scope.unit19.value = formatFloat($scope.unit22.value / $scope.unit22.factor);
    });
    // Miles (international nautical)   
    $scope.$watch('unit23.value', function(){
        $scope.unit19.value = formatFloat($scope.unit23.value / $scope.unit23.factor);
    });
    // Miles (UK nautical) 
    $scope.$watch('unit24.value', function(){
        $scope.unit19.value = formatFloat($scope.unit24.value / $scope.unit24.factor);
    });
    // Millimeters
    $scope.$watch('unit25.value', function(){
        $scope.unit19.value = formatFloat($scope.unit25.value / $scope.unit25.factor);
    });
    // Nanometers
    $scope.$watch('unit26.value', function(){
        $scope.unit19.value = formatFloat($scope.unit26.value / $scope.unit26.factor);
    });
    // Parsecs
    $scope.$watch('unit27.value', function(){
        $scope.unit19.value = formatFloat($scope.unit27.value / $scope.unit27.factor);
    });
    // Picometers
    $scope.$watch('unit28.value', function(){
        $scope.unit19.value = formatFloat($scope.unit28.value / $scope.unit28.factor);
    });
    // Scandinavian mile
    $scope.$watch('unit29.value', function(){
        $scope.unit19.value = formatFloat($scope.unit29.value / $scope.unit29.factor);
    });
    // Thou
    $scope.$watch('unit30.value', function(){
        $scope.unit19.value = formatFloat($scope.unit30.value / $scope.unit30.factor);
    });
    //Yards
    $scope.$watch('unit31.value', function(){
        $scope.unit19.value = formatFloat($scope.unit31.value / $scope.unit31.factor);
    });
    
    //Feet and Inches
    $scope.$watch('unit32.value', function(){
        $scope.unit19.value = formatFloat($scope.unit31.value / $scope.unit31.factor);
    });
    
   
    
    
     // Meters (MAIN unit)
    $scope.$watch('unit19.value', function(){
        // Angstroms
        $scope.unit1.value = formatFloat($scope.unit19.value * $scope.unit1.factor);
        // Astronomical units
        $scope.unit2.value = formatFloat($scope.unit19.value * $scope.unit2.factor);
        // Barley corns
        $scope.unit3.value = formatFloat($scope.unit19.value * $scope.unit3.factor);
        // Cables
        $scope.unit4.value = formatFloat($scope.unit19.value * $scope.unit4.factor);
        // Centimers
        $scope.unit5.value = formatFloat($scope.unit19.value * $scope.unit5.factor);
        // Chains
        $scope.unit6.value = formatFloat($scope.unit19.value * $scope.unit6.factor);
        // Decimeters
        $scope.unit7.value = formatFloat($scope.unit19.value * $scope.unit7.factor);
        // Ells
        $scope.unit8.value = formatFloat($scope.unit19.value * $scope.unit8.factor);
        // Fathoms
        $scope.unit9.value = formatFloat($scope.unit19.value * $scope.unit9.factor);
        // Feet UK
        $scope.unit10.value = formatFloat($scope.unit19.value * $scope.unit10.factor);
        // Feet US
        $scope.unit11.value = formatFloat($scope.unit19.value * $scope.unit11.factor);
         // Furlongs (US survey)
        $scope.unit12.value = formatFloat($scope.unit19.value * $scope.unit12.factor);
        // Hands
        $scope.unit13.value = formatFloat($scope.unit19.value * $scope.unit13.factor);
        // Hectometers
        $scope.unit14.value = formatFloat($scope.unit19.value * $scope.unit14.factor);
        // Inches
        $scope.unit15.value = formatFloat($scope.unit19.value * $scope.unit15.factor);
        // Kilometers
        $scope.unit16.value = formatFloat($scope.unit19.value * $scope.unit16.factor); 
        //League
        $scope.unit17.value = formatFloat($scope.unit19.value * $scope.unit17.factor);
        //Light Years
        $scope.unit18.value = formatFloat($scope.unit19.value * $scope.unit18.factor);
        //Micro meter
        $scope.unit20.value = formatFloat($scope.unit19.value * $scope.unit20.factor);
         //Mil
        $scope.unit21.value = formatFloat($scope.unit19.value * $scope.unit21.factor);
        // Miles
        $scope.unit22.value = formatFloat($scope.unit19.value * $scope.unit22.factor);
        // Miles (international nautical)
        $scope.unit23.value = formatFloat($scope.unit19.value * $scope.unit23.factor);
        // Miles (UK nautical)
        $scope.unit24.value = formatFloat($scope.unit19.value * $scope.unit24.factor);
        // Millimeters
        $scope.unit25.value = formatFloat($scope.unit19.value * $scope.unit25.factor);
        // Nanometers
        $scope.unit26.value = formatFloat($scope.unit19.value * $scope.unit26.factor);
        // Parsecs
        $scope.unit27.value = formatFloat($scope.unit19.value * $scope.unit27.factor);
        // Picometers
        $scope.unit28.value = formatFloat($scope.unit19.value * $scope.unit28.factor);
        // Scandinavian mile
        $scope.unit29.value = formatFloat($scope.unit19.value * $scope.unit29.factor);
        // Thou
        $scope.unit30.value = formatFloat($scope.unit19.value * $scope.unit30.factor);
       //Yards
        $scope.unit31.value = formatFloat($scope.unit19.value * $scope.unit31.factor);
    });
    
     // helper function for rounding
    function formatFloat(aFloat) {
  // http://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros
        //return parseFloat(aFloat.toFixed(6));
        return aFloat;
    }
    

}]);
    
    
 
}());