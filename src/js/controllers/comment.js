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

            $scope.isValidEmailAddress = function(emailAddress)  {
                var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
                return pattern.test(emailAddress);
            };

            $scope.processForm = function(){

                console.log("formData " + $.param($scope.formData));

                $('#input-name').removeClass('error');
                                    $('#input-email').removeClass('error');
                                    $('#comment-field').removeClass('error');
                // JS validation goes here

                if( $scope.formData.name) {
                    if( $scope.isValidEmailAddress($scope.formData.email) ){
                        if( $scope.formData.comments ) {

                            $http({
                                method  : 'POST',
                                url     : 'php/submit_form.php',
                                data    : $.param($scope.formData), 
                                headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } 
                            })
                            .success(function(data) {

                                if (!data.success) {
                                  // if not successful, bind errors to error variables
                                  //$scope.errorName = data.errors.name;
                                  $scope.errorName = data.errors.name;
                                  $scope.errorEmail = data.errors.email;
                                  $scope.errorComments = data.errors.comments;

                                  //console.log(data.errors);
                                } else {
                                  // if successful, bind success message to message
                                    $('#input-name').removeClass('error');
                                    $('#input-email').removeClass('error');
                                    $('#comment-field').removeClass('error');

                                    $scope.dataResponseField = "Your message is send, thank you.";
                                    $scope.formData.email = "";
                                    $scope.formData = {};
                                }
                            });
                        }else{
                            $('#comment-field').addClass('error');
                        }
                    }else{
                        $('#input-email').addClass('error');

                    }
                }else{
                    $('#input-name').addClass('error');
                }
            
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