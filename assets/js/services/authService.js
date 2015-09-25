var authServiceAPI = function($injectHttp, $q, $base64, $cookieStore, $rootScope, $timeout) {
    $http = $injectHttp;

    var API = {};

    API.keepLoggedIn = function() {

        $rootScope.globals = $cookieStore.get('globals') || {};

        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

    };


    API.isLoggedIn = function() {

        // var deferred = $q.defer();

        //  $timeout(function () {
        //       if (typeof($rootScope.globals.currentUser) === 'undefined') 
        //       {
        //           deferred.resolve(false);
        //           console.log("API.isLoggedIn Not logged in");
        //       }
        //       else {
        //           deferred.resolve(true);
        //           console.log("API.isLoggedIn Logged in");

        //       }

        //   }, 10);

        // return deferred.promise;

        if (typeof($rootScope.globals.currentUser) === 'undefined') {
            return false;
            console.log("API.isLoggedIn Not logged in");
        } else {
            return true;
            console.log("API.isLoggedIn Logged in");

        }

    }

    API.login = function(username, password) {


        /* Dummy authentication for testing, uses $timeout to simulate api call
         ----------------------------------------------*/
        var response = {
            success: false
        };

        var deferred = $q.defer();

        $http({
                method: 'GET',
                // url: 'dummy_data/user/' + username + '.json'
                url: apiUrl + 'user/' + username
            })
            .success(function(data, status, headers, config) {
                response.success = (username === data.username && password === data.password);

                $timeout(function() {
                    if (response.success) {
                        response.assetId = data.assetId;
                        response.localeCode = data.localeCode;
                        deferred.resolve(response);
                    } else {
                        response.message = 'Username or password is incorrect';
                        deferred.resolve(response);
                    }
                }, 500);
            })
            .error(function(data, status, headers, config) {
                $timeout(function() {
                    response.message = 'Username or password is incorrect';
                    deferred.resolve(response);
                }, 500);
            });

        return deferred.promise;


        /* Use this for real authentication
         ----------------------------------------------*/
        //$http.post('/api/authenticate', { username: username, password: password })
        //    .success(function (response) {
        //        callback(response);
        //    });

    };

    API.setCredentials = function(username, password, assetId) {
        var authdata = $base64.encode(username + ':' + password);

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata,
                assetId: assetId
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        $cookieStore.put('globals', $rootScope.globals);
    };

    API.clearCredentials = function() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
    };

    API.getAssetId = function() {
        return $rootScope.globals.currentUser.assetId;
    };

    // API.authenticated = function () {

    //     var deferred = $q.defer();

    //     API.isLoggedIn().then(function (isLoggedIn) {
    //         if (isLoggedIn) {
    //             console.log("authenticated function Logged in");
    //             deferred.resolve();
    //         } 
    //         else {
    //             console.log("authenticated function Not logged in");
    //             deferred.reject('authenticated function Not logged in');
    //         }
    //     });

    //     return deferred.promise;
    // };

    return API;
};
// 
services.factory('authService', ['$http', '$q', '$base64', '$cookieStore', '$rootScope', '$timeout', authServiceAPI]);