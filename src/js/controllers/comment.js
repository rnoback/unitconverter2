(function () {
    /* jshint -W071 */
    'use strict';
    var converterApp = angular.module('converterApp');
    
    converterApp.controller('commentController', 
        ['$scope', '$http', '$location', 'unitSelectionService', 'formatNumberFactory',
        function($scope, $http, $location, unitSelectionService, formatNumberFactory) {

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


           

            $('#input-name').on('keyup', function(){
                formatNumberFactory.storeName = $('#input-name').val();
            });

            $('#input-email').on('keyup', function(){
                formatNumberFactory.storeEmail = $('#input-email').val();
            });

            $('#comment-field').on('keyup', function(){
                formatNumberFactory.storeComment = $('#comment-field').val();
            });

            
            setTimeout(function(){
                $('#input-name').val(formatNumberFactory.storeName);
                $('#input-email').val(formatNumberFactory.storeEmail);
                $('#comment-field').val(formatNumberFactory.storeComment);
            }, 5);
             



            $scope.processForm = function(){

                //console.log("formData " + $.param($scope.formData));

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
                                    formatNumberFactory.storeName = "";
                                    formatNumberFactory.storeEmail = "";
                                    formatNumberFactory.storeComment = "";

                                    $scope.dataResponseField = "Thank you! Your message has been sent.";
                                    $('.comment-form').hide();
                                    $scope.formData.email = "";
                                    $scope.formData = {};
                                    setTimeout(function(){
                                        $('.comment-form').show();
                                        $scope.dataResponseField = "";


                                    }, 3000);
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

            $('.btn-cancel-comment').on('click', function(){
                history.go(-1);
            });


            
            $('.btn-collapse-window').on('click', function(){
                if($scope.windowOpen) {
                    $(this).find('span').removeClass('fa-chevron-up');
                    $(this).find('span').addClass('fa-chevron-down');
                    $(this).closest('#box-container').addClass('collapsed');
                    $('.box-body').hide();
                    $('.units-dropdown').hide();
                    $('.dropdown-multiselect').hide();
                    $('.btn-cancel-comment').hide();
                    $scope.windowOpen = false;
                }else{
                    $(this).find('span').addClass('fa-chevron-up');
                    $(this).find('span').removeClass('fa-chevron-down');
                    $(this).closest('#box-container').removeClass('collapsed');
                    $('.box-body').show();
                    $('.units-dropdown').show();
                    $('.dropdown-multiselect').show();
                    $('.btn-cancel-comment').show();
                    $scope.windowOpen = true;
                }
            });

    }]);
    
    
 
}());