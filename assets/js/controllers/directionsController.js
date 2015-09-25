'use strict';

angular.module('app', ['snapscroll','ngMap'])
	.controller('directionsCtrl', ['$scope', '$rootScope', '$translate', '$asyncTranslator', 'viewSummary', 'stylesJson',
		function($scope, $rootScope, $translate, $asyncTranslator, viewSummary, stylesJson) {

			$scope.directions = viewSummary.viewData.directions;
			$scope.styles = JSON.stringify(stylesJson);

			// set translationid for contents
			for (var key in viewSummary.viewData.contents) {
				$scope[key] = viewSummary.viewData.contents[key];
			}

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
		}
	]);