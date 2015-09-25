var asyncTranslatorProvider = function() {

  var persistentViewInfos = [];
  var viewInfosWithLang = {};

  var asyncTranslatorService = function($rootScope, $cookieStore, $q, dataService) {

    var activateViewInfos = this.activateViewInfos;

    var viewInfoLoaded = function(localeCode, viewInfo) {
      var viewInfoList = viewInfosWithLang[localeCode];
      if (viewInfoList) {
        if (viewInfoList.indexOf(viewInfo.viewName) > -1) {
          return true;
        }
      }
      return false;

    };

    var queryTranslation = function(localeCode, viewInfo) {
      var deferred = $q.defer();

      dataService.getTranslationsData(localeCode, viewInfo)
        .then(function(translationsData) {

          if (!viewInfosWithLang[localeCode]) {
            viewInfosWithLang[localeCode] = [];
            viewInfosWithLang[localeCode].push(viewInfo.viewName);
          } else {
            viewInfosWithLang[localeCode].push(viewInfo.viewName);
          }

          if (viewInfo.viewType != "blocks") {
            var adjustedData = {};

            for (var key in translationsData) {
              adjustedData[viewInfo.viewName + '_' + key] = translationsData[key];
            }

            deferred.resolve(adjustedData);
          } else {
            deferred.resolve(translationsData);
          }


        });

      return deferred.promise;
    };

    var queryTranslations = function(localeCode, viewInfos) {

      var deferred = $q.defer();

      var promises = [];
      angular.forEach(viewInfos, function(viewInfo) {
        if (!viewInfoLoaded(localeCode, viewInfo)) {
          promises.push(
            queryTranslation(localeCode, viewInfo)
          );
        }

      });

      $q.all(promises).then(function(data) {
        var length = data.length,
          mergedData = {};

        for (var i = 0; i < length; i++) {
          for (var key in data[i]) {
            mergedData[key] = data[i][key];
          }
        }

        deferred.resolve(mergedData);
      }, function(data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var API = function(options) {
      return queryTranslations(options.key, persistentViewInfos);
    };

    API.queryTranslations = queryTranslations;

    API.setViewInfos = function(viewInfos) {
      persistentViewInfos = [];

      angular.forEach(viewInfos, function(viewInfo) {
        persistentViewInfos.push(viewInfo);
      });
    };


    API.activateViewInfos = activateViewInfos;

    API.keepLocaleCode = function() {
      $rootScope.localeCode = $cookieStore.get('localeCode') || "";
    }

    API.setLocaleCode = function(localeCode) {
      $rootScope.localeCode = localeCode;
      $cookieStore.put('localeCode', localeCode);
    }

    API.clearLocaleCode = function() {
      $rootScope.localeCode = "";
      $cookieStore.remove('localeCode');
    };

    return API;
  };

  return {
    activateViewInfos: function() {},
    queryTranslations: asyncTranslatorService.queryTranslations,
    $get: ['$rootScope', '$cookieStore', '$q', 'dataService', asyncTranslatorService]
  };
};

services.provider('$asyncTranslator', asyncTranslatorProvider);