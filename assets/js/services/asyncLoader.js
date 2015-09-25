'use strict';

var asyncLoaderAPI = function($q, $timeout, dataService) {

	return function (options) {
	    var deferred = $q.defer(),
	        translations;

		var localOption = JSON.parse(options.key);

		dataService.getTranslationsData(localOption.assetId, localOption.viewName, localOption.viewType)
			.then(function (translations){
			    deferred.resolve(translations[localOption.localeCode]);
			});
	 

	 
	    return deferred.promise;
	};
};



services.factory('asyncLoader', ['$q', '$timeout', 'dataService', asyncLoaderAPI]);
