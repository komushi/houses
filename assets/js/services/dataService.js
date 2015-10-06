var dataServiceAPI = function($injectHttp, $q, $timeout) {

  $http = $injectHttp;

  var API = {};
  
  // API.getServicesViewData = function(viewInfo) {
  //   var deferred = $q.defer();

  //   $http({
  //       method: 'GET',
  //       // url: 'dummy_data/view_data/' + viewInfo.assetId + '_' + viewInfo.viewType + '_' + viewInfo.viewName + '.json'
  //       url: apiUrl + 'view_data/' + viewInfo.assetId + '/' + viewInfo.viewType + '/' + viewInfo.viewName

  //       url: apiUrl + 'view_data/' + role + '/' + userId
  //     })
  //     .success(function(data, status, headers, config) {
  //       $timeout(function() {
  //         deferred.resolve(data);
  //       }, 100);
  //     })
  //     .error(function(data, status, headers, config) {
  //       // deferred.reject(status + " " + data);
  //       deferred.resolve();
  //     });

  //   return deferred.promise;

  // };

  API.getViewData = function(viewInfo) {
    var deferred = $q.defer();

    $http({
        method: 'GET',
        // url: 'dummy_data/view_data/' + viewInfo.assetId + '_' + viewInfo.viewType + '_' + viewInfo.viewName + '.json'
        url: apiUrl + 'view_data/' + viewInfo.assetId + '/' + viewInfo.viewType + '/' + viewInfo.viewName
      })
      .success(function(data, status, headers, config) {
        $timeout(function() {
          deferred.resolve(data);
        }, 100);
      })
      .error(function(data, status, headers, config) {
        // deferred.reject(status + " " + data);
        deferred.resolve();
      });

    return deferred.promise;

  };

  API.getTranslationsData = function(localeCode, viewInfo) {
    var deferred = $q.defer();

    $http({
        method: 'GET',
        // url: 'dummy_data/translation/' + viewInfo.assetId + '_' + viewInfo.viewType + '_' + viewInfo.viewName + '.json'
        url: apiUrl + 'translation/' + viewInfo.assetId + '/' + viewInfo.viewType + '/' + viewInfo.viewName + '/' + localeCode
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config) {
        // deferred.reject(status + " " + data);
        deferred.resolve();
      });

    return deferred.promise;

  };

  API.getMenuData = function(assetId) {
    var deferred = $q.defer();

    $http({
        method: 'GET',
        // url: 'dummy_data/menu/' + assetId + '_menu.json'
        url: apiUrl + 'menu/' + assetId
      })
      .success(function(data, status, headers, config) {
          deferred.resolve(data["menus"]);
      })
      .error(function(data, status, headers, config) {
        deferred.resolve();
      });

    return deferred.promise;

  };

  // API.getServicesMenuData = function(role, userId) {
  //   var deferred = $q.defer();

  //   $http({
  //       method: 'GET',
  //       url: apiUrl + 'services_menu/' + userId
  //     })
  //     .success(function(data, status, headers, config) {
  //         deferred.resolve(data["menus"]);
  //     })
  //     .error(function(data, status, headers, config) {
  //       deferred.resolve();
  //     });

  //   return deferred.promise;

  // };

  return API;
};

services.factory('dataService', ['$http', '$q', '$timeout', dataServiceAPI]);