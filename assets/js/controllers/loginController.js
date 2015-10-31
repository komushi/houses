'use strict';
angular.module('app')
    .controller('loginCtrl', ['$scope', '$rootScope', '$state', '$window', '$asyncTranslator', 'authService', 'menuService',
        function($scope, $rootScope, $state, $window, $asyncTranslator, authService, menuService) {

            $scope.login = function() {
                $scope.dataLoading = true;

                authService.login($scope.username, $scope.password).then(function(response) {
                    if (response.success) {

                        authService.setCredentials($scope.username, $scope.password, response.assetId, response.role, response.fullName);

                        $asyncTranslator.setLocaleCode(response.localeCode);

                        menuService.retreiveMenus().then(function() {
                            $rootScope.logout = false;

                            console.log("state go to app.home from login ctrl!!!");
                            $state.go('app.home');

                        });


                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });

            };


            if ($rootScope.logout) {
                // reset login status
                authService.clearCredentials();

                $asyncTranslator.clearLocaleCode();

                // have to refresh before we can remove state
                $window.location.reload();

            }


        }
    ]);