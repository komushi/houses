// assets/js/controllers/headerController.js
'use strict';

/* Controllers */

angular.module('app')
    .controller('HeaderCtrl', ['$scope', '$rootScope', '$state', '$asyncTranslator', function($scope, $rootScope, $state, $asyncTranslator) {

        console.log("header controller!!!!!!!!!!!!!!!!!!!");

        $scope.logout = function() {

            console.log("header logout!!!!!!!!!!!!!!!!!!!");
            $state.go('logout');

        }

        $scope.changeLanguage = function(localeCode) {
            $asyncTranslator.setLocaleCode(localeCode);
            $rootScope.$broadcast('rootScope:localeChanged', localeCode);
        };

    }]);