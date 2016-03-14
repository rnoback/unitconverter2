(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('commentController', 
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
            var url = document.URL;
            $scope.unit = 'Select a Unit'; 
            // Add it to text button    
            $scope.unitCustomTexts = {buttonDefaultText:$scope.unit};
            
            $scope.redirectUnit = unitSelectionService.redirectUnit;

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