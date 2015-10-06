/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

app.config(['$stateProvider', '$urlRouterProvider',

        function($stateProvider, $urlRouterProvider) {
            

            // global reference for runtime stateProvider access
            app.stateProvider = $stateProvider;

            // $urlRouterProvider.deferIntercept();
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "tpl/login.html",
                    controller: 'loginCtrl'
                })
                .state('logout', {
                    url: "/logout",
                    controller: 'logoutCtrl'
                })
                .state('app', {
                    abstract: true,
                    url: "/app",
                    templateUrl: "tpl/app.html"
                })
                .state('app_services', {
                    abstract: true,
                    url: "/app_services",
                    templateUrl: "tpl/app_services.html"
                });
        }
    ]);

app.run(['$rootScope', '$state', '$cookieStore', '$urlRouter', '$asyncTranslator', 'authService', 'menuService',
    function ($rootScope, $state, $cookieStore, $urlRouter, $asyncTranslator, authService, menuService) {

    // keep user logged in after page refresh
    authService.keepLoggedIn();
    menuService.keepMenus();
    $asyncTranslator.keepLocaleCode();
    menuService.fillDynamicStates();


    $rootScope.$on('$stateChangeError', function () {
        // Redirect user to our login page
        console.log("stateChangeError");
        $state.go('login');
    });


}]);
