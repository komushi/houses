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
                });
                // .state('app.home', {
                //     url: "/home",
                //     templateUrl: "tpl/home.html",
                //     controller: "HomeCtrl",
                //     resolve: {
                //         deps: ["$ocLazyLoad", function($ocLazyLoad) {
                //             return $ocLazyLoad.load([
                //                 ], {
                //                     insertBefore: "#lazyload_placeholder"
                //                 })
                //                 .then(function() {
                //                     return $ocLazyLoad.load([
                //                         "assets/js/controllers/homeController.js"
                //                     ]);
                //                 });
                //         }],
                //         authenticated: authenticated,
                //         viewName: 
                //                     ['$q', function ($q) {
                //                         var deferred = $q.defer();
                                        
                //                         deferred.resolve("home");

                //                         return deferred.promise;
                //                     }]
                //     }
                // })
                // .state('app.static_map', {
                //     url: '/static_map',
                //     templateUrl: 'tpl/static_map.html',
                //     controller: 'StaticMapCtrl',
                //     resolve: {
                //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
                //             return $ocLazyLoad.load([
                //                     'staticMaps'
                //                 ], {
                //                     insertBefore: '#lazyload_placeholder'
                //                 })
                //                 .then(function() {
                //                     return $ocLazyLoad.load([
                //                         'assets/js/controllers/static_map.js'
                //                     ]);
                //                 });
                //         }],
                //         authenticated: authenticated
                //     }
                // })
                // .state('app.ng_map_static', {
                //     url: '/ng_map_static',
                //     templateUrl: 'tpl/ng_map_static.html',
                //     controller: 'NgMapCtrl',
                //     resolve: {
                //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
                //             return $ocLazyLoad.load([
                //                     'ng-map'
                //                 ], {
                //                     insertBefore: '#lazyload_placeholder'
                //                 })
                //                 .then(function() {
                //                     return $ocLazyLoad.load('assets/js/controllers/ng_map_static.js');
                //                 });
                //         }],
                //         authenticated: authenticated
                //     }
                // });

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
