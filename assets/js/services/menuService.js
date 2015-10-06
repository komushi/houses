'use strict';

var menuServiceAPI = function($rootScope, $state, $q, $ocLazyLoad, $cookieStore, dataService) {

  var authenticated = ['$q', 'authService', function($q, authService) {
    var deferred = $q.defer();

    var isLoggedIn = authService.isLoggedIn();

    if (isLoggedIn) {
      console.log("authenticated function Logged in");
      deferred.resolve();
    } else {
      console.log("authenticated function Not logged in");
      deferred.reject('authenticated function Not logged in');
    }

    return deferred.promise;
  }];


  var adjustViewData = function(viewName, viewData) {
    if (!viewData) {
      return {};
    }

    if (viewData.contents) {
      var contents = {};

      angular.forEach(viewData.contents, function(content) {
        contents[content.translationId] = viewName + "_" + content.translationId;
      });

      delete viewData.contents;

      viewData.contents = contents;
    }

    if (viewData.slides) {
      angular.forEach(viewData.slides, function(slide) {
        slide.translationId = viewName + "_" + slide.translationId;
        if (slide.desc) {
          slide.desc.translationId = viewName + "_" + slide.desc.translationId;
        }

      });
    }

    if (viewData.map) {
      if (viewData.map.markers) {
        angular.forEach(viewData.map.markers, function(marker) {
          marker.translationId = viewName + "_" + marker.translationId;
          if (marker.desc) {
            marker.desc.translationId = viewName + "_" + marker.desc.translationId;
          }

        });

      }
    }
    return viewData;

  };

  var createServicesState = function(stateDetails) {

    stateDetails.parentState = "app_services";

    if ($state.get(stateDetails.parentState + "." + stateDetails.viewName)) {
      return;
    }

    stateDetails.controllerUrl = "assets/js/controllers/" + stateDetails.viewType + "Controller.js";

    switch (stateDetails.viewType) {

      case "info":
        stateDetails.plugin = ["snapscroll"];
        break;

      case "info2":
        stateDetails.plugin = ["snapscroll", "truncate"];
        break;

      case "directions":
        stateDetails.plugin = ["ng-map"];
        break;

      case "map":
        stateDetails.plugin = ["ng-map"];
        break;

    }

    var stateConfig = {};
    stateConfig.url = "/" + stateDetails.viewName;
    stateConfig.templateUrl = "tpl/" + stateDetails.viewType + ".html";
    stateConfig.controller = stateDetails.viewType + "Ctrl";

    var resolve = {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load(stateDetails.plugin, {
            insertBefore: '#lazyload_placeholder'
          })
          .then(function() {
            return $ocLazyLoad.load(stateDetails.controllerUrl);
          });
      }],
      viewSummary: ['$q', function($q) {
        var deferred = $q.defer();

        var viewInfo = {
          userId: stateDetails.userId,
          viewName: stateDetails.viewName,
          viewType: stateDetails.viewType
        };

        var headerInfo = {
          "userId": stateDetails.userId,
          "viewType": "blocks",
          "viewName": "header"
        };

        // var sidebarInfo = {
        //   "userId": stateDetails.userId,
        //   "viewType": "blocks",
        //   "viewName": "sidebar"
        // };

        var viewInfos = [];
        viewInfos.push(viewInfo);
        viewInfos.push(headerInfo);
        // viewInfos.push(sidebarInfo);

        var viewSummary = {
          viewInfos: viewInfos
        };

        dataService.getViewData(viewInfo)
          .then(function(data) {

            viewSummary.viewData = adjustViewData(viewInfo.viewName, data);

            deferred.resolve(viewSummary);
          }, function() {
            deferred.resolve(viewSummary);
          });



        return deferred.promise;
      }],
      authenticated: authenticated
    };

    // get settings
    switch (stateDetails.viewType) {
      case 'directions':
        var stylesJson = ['jsonService', function(jsonService) {
          return jsonService.getJson(stateDetails.styles);
        }];

        resolve.stylesJson = stylesJson;
        break;

      case 'map':
        var stylesJson = ['jsonService', function(jsonService) {
          return jsonService.getJson(stateDetails.styles);
        }];

        resolve.stylesJson = stylesJson;
        break;

      case 'maptest':
        var stylesJson = ['jsonService', function(jsonService) {
          return jsonService.getJson(stateDetails.styles);
        }];

        resolve.stylesJson = stylesJson;
        break;
    }

    stateConfig.resolve = resolve;

    app.stateProvider.state(stateDetails.parentState + "." + stateDetails.viewName, stateConfig);

    $rootScope.$broadcast("stateCreated", {
      "state": stateDetails.viewName,
      "parentState": stateDetails.parentState
    });

  };

  var createState = function(stateDetails) {

    stateDetails.parentState = "app";

    if ($state.get(stateDetails.parentState + "." + stateDetails.viewName)) {
      return;
    }

    if (stateDetails.hasSub) {
      return;
    }

    stateDetails.controllerUrl = "assets/js/controllers/" + stateDetails.viewType + "Controller.js";

    switch (stateDetails.viewType) {

      case "info":
        stateDetails.plugin = ["snapscroll"];
        break;

      case "info2":
        stateDetails.plugin = ["snapscroll", "truncate"];
        break;

      case "directions":
        stateDetails.plugin = ["ng-map"];
        break;

      case "map":
        stateDetails.plugin = ["ng-map"];
        break;

      case "maptest":
        stateDetails.plugin = ["snapscroll", "ng-map"];
        break;
    }

    var stateConfig = {};
    stateConfig.url = "/" + stateDetails.viewName;
    stateConfig.templateUrl = "tpl/" + stateDetails.viewType + ".html";
    stateConfig.controller = stateDetails.viewType + "Ctrl";

    var resolve = {
      deps: ['$ocLazyLoad', function($ocLazyLoad) {
        return $ocLazyLoad.load(stateDetails.plugin, {
            insertBefore: '#lazyload_placeholder'
          })
          .then(function() {
            return $ocLazyLoad.load(stateDetails.controllerUrl);
          });
      }],
      viewSummary: ['$q', function($q) {
        var deferred = $q.defer();

        var viewInfo = {
          assetId: stateDetails.assetId,
          viewName: stateDetails.viewName,
          viewType: stateDetails.viewType
        };

        var headerInfo = {
          "assetId": stateDetails.assetId,
          "viewType": "blocks",
          "viewName": "header"
        };

        var sidebarInfo = {
          "assetId": stateDetails.assetId,
          "viewType": "blocks",
          "viewName": "sidebar"
        };

        var viewInfos = [];
        viewInfos.push(viewInfo);
        viewInfos.push(headerInfo);
        viewInfos.push(sidebarInfo);

        var viewSummary = {
          viewInfos: viewInfos
        };

        dataService.getViewData(viewInfo)
          .then(function(data) {

            viewSummary.viewData = adjustViewData(viewInfo.viewName, data);

            deferred.resolve(viewSummary);
          }, function() {
            deferred.resolve(viewSummary);
          });



        return deferred.promise;
      }],
      authenticated: authenticated
    };

    // get settings
    switch (stateDetails.viewType) {
      case 'directions':
        var stylesJson = ['jsonService', function(jsonService) {
          return jsonService.getJson(stateDetails.styles);
        }];

        resolve.stylesJson = stylesJson;
        break;

      case 'map':
        var stylesJson = ['jsonService', function(jsonService) {
          return jsonService.getJson(stateDetails.styles);
        }];

        resolve.stylesJson = stylesJson;
        break;

      case 'maptest':
        var stylesJson = ['jsonService', function(jsonService) {
          return jsonService.getJson(stateDetails.styles);
        }];

        resolve.stylesJson = stylesJson;
        break;
    }

    stateConfig.resolve = resolve;

    app.stateProvider.state(stateDetails.parentState + "." + stateDetails.viewName, stateConfig);

    $rootScope.$broadcast("stateCreated", {
      "state": stateDetails.viewName,
      "parentState": stateDetails.parentState
    });

  };

  var API = {};

  API.keepMenus = function() {
    $rootScope.menus = $cookieStore.get('menus') || [];

    angular.forEach($rootScope.menus, function(menuKey) {
      $rootScope[menuKey] = $cookieStore.get(menuKey) || [];
    });

  };

  var saveMenus = function(menus) {
    var deferred = $q.defer();

    $rootScope.menus = [];

    for (var key in menus) {
      $rootScope[key] = menus[key];
      $cookieStore.put(key, menus[key]);

      $rootScope.menus.push(key);
    }

    $cookieStore.put("menus", $rootScope.menus);

    deferred.resolve();

    return deferred.promise;
  }


  API.retreiveMenus = function() {

    var deferred = $q.defer();

    $rootScope.menus = [];

    dataService.getMenuData($rootScope.globals.currentUser.assetId)
      .then(saveMenus)
      .then(function (){
        API.fillDynamicStates();

        deferred.resolve();
      });
    

    return deferred.promise;
  };

  // API.retreiveMenus = function() {

  //   var deferred = $q.defer();

  //   $rootScope.menus = [];

  //   if ($rootScope.currentUser.role == "guest") {
  //     dataService.getMenuData($rootScope.currentUser.assetId)
  //       .then(saveMenus)
  //       .then(function (){
  //         API.fillDynamicStates();

  //         deferred.resolve();
  //       });
  //   }
  //   else if ($rootScope.currentUser.role == "cleaning") {
  //     dataService.getServicesMenuData($rootScope.currentUser.role, $rootScope.currentUser.userId)
  //       .then(saveMenus)
  //       .then(function (){
  //         API.fillDynamicStates();

  //         deferred.resolve();
  //       });
  //   }
  //   else {
  //     deferred.resolve();
  //   }

  //   return deferred.promise;
  // };

  API.fillDynamicStates = function() {

    angular.forEach($rootScope.menus, function(menuKey) {
      angular.forEach($rootScope[menuKey], function(item) {
        createState(item);
      });
    });
  };

  var generateMenu = function (menuKey) {

    var menu = [];
    angular.forEach($rootScope[menuKey], function(item) {


      if (item.hasSub) {
        menu.push({
          "translationId": item.translationId,
          "icon": item.icon,
          "hasSub": item.hasSub,
          "submenu": generateMenu(item.submenu)
        });
      } else {
        menu.push({
          "translationId": item.translationId,
          "icon": item.icon,
          "sref": (item.parentState + "." + item.viewName)
        });
      }

    });

    return menu;

  };


  API.getMenu = function() {

    return generateMenu("main");

  };


  return API;
};

services.factory('menuService', ['$rootScope', '$state', '$q', '$ocLazyLoad', '$cookieStore', 'dataService', menuServiceAPI]);