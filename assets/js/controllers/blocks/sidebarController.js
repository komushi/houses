// assets/js/controllers/sidebarController.js
'use strict';

/* Controllers */

angular.module('app')
    .controller('SidebarCtrl', ['$scope', '$translate', 'menuService', function($scope, $translate, menuService) {

        console.log("sidebar controller!!!!!!!!!!!!!!!!!!!");

        var menu = menuService.getMenu();
        
        angular.extend($scope, {
            menu: menu
        });


    }]);