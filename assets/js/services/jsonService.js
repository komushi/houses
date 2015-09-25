'use strict';

var jsonServiceAPI = function($http, $q, $timeout) {

	// $http = $http;

	var API = {};
    
    API.getJson = function(jsonName) {

		var deferred = $q.defer();

		$http({
			method: 'GET', 
			url: 'assets/settings/' + jsonName + '.json'
		})
		.success(function(data, status, headers, config) {
	        // $timeout( function() {
	        //   deferred.resolve(data);
	        // }, 100);
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config) {
			// deferred.reject(status + " " + data);
			deferred.resolve();
		});

		return deferred.promise;
    };
    
    return API;
};

services.factory('jsonService', ['$http', '$q', '$timeout', jsonServiceAPI]);

