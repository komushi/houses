// assets/js/controllers/headerController.js
'use strict';

/* Controllers */

angular.module('app')
    .controller('logoutCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

        console.log("LogoutCtrl logout!!!!!!!!!!!!!!!!!!!");

        $rootScope.logout = true;
        
        $state.go('login');

        
    }]);