'use strict';

/* Controllers */

angular.module('app', ['snapscroll', 'truncate'])
  .controller('info2Ctrl', ['$scope', '$rootScope', '$translate', '$asyncTranslator', 'viewSummary',
    function($scope, $rootScope, $translate, $asyncTranslator, viewSummary) {

      console.log("Info2 controller!!!!");

      $scope.number = 80;

      // set translationid for contents
      for (var key in viewSummary.viewData.contents) {
        $scope[key] = viewSummary.viewData.contents[key];
      }

      // set translationid for slides
      $scope.slides = [];
      angular.forEach(viewSummary.viewData.slides, function(slide) {
        $scope.slides.push(slide);
      })

      // initial translation
      if ($rootScope.localeCode) {
        $asyncTranslator.setViewInfos(viewSummary.viewInfos);
        $translate.use($rootScope.localeCode);
      }

      // translation when new language is selected
      $scope.$on('rootScope:localeChanged', function(event, localeCode) {
        if (localeCode) {
          $asyncTranslator.setViewInfos(viewSummary.viewInfos);
          $translate.use(localeCode);
        }
      });

      $scope.maximizeMessage = function() {
        $scope.number = 2000;
      };

      $scope.restoreMessage = function() {
        $scope.number = 80;
      };

      $scope.setMessage = function(snapIndex) {
        console.log('just snapped to', snapIndex);
        $scope.MESSAGE = viewSummary.viewData.slides[snapIndex].desc.translationId;
      };

    }
  ]);