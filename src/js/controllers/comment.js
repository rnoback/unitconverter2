(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('commentController', 
        ['$scope', '$http', '$location', 'unitSelectionService',
        function($scope, $http, $location, unitSelectionService) {

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
            $scope.unit = 'Select a Unit'; 
            // Add it to text button    
            $scope.unitCustomTexts = {buttonDefaultText:$scope.unit};
            
            $scope.redirectUnit = unitSelectionService.redirectUnit;

            // collapse window => needs to go in a directive
            $scope.windowOpen = true;


            $scope.formData = {};


            $scope.processForm = function(){

                console.log("formData " + $.param($scope.formData));

                // JS validation goes here

                $http({
                    method  : 'POST',
                    url     : 'php/submit_form.php',
                    data    : $.param($scope.formData),  // pass in data as strings
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                })
                .success(function(data) {
                    console.log("Response " + data);

                    if (!data.success) {
                      // if not successful, bind errors to error variables
                      $scope.errorName = data.errors.name;

                      console.log(data.errors);
                    } else {
                      // if successful, bind success message to message
                      $scope.message = data.message;
                    }
                });
            
            } 

            
            
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