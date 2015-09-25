'use strict';

angular.module('app', ['snapscroll','ngMap'])
	.controller('mapCtrl', ['$scope', '$rootScope', '$translate', '$asyncTranslator', 'viewSummary', 'stylesJson',
		function($scope, $rootScope, $translate, $asyncTranslator, viewSummary, stylesJson) {

			$scope.styles = JSON.stringify(stylesJson);
			$scope.markers = viewSummary.viewData.map.markers;
			$scope.zoom = viewSummary.viewData.map.zoom;
			$scope.center = viewSummary.viewData.map.center;

			for (var key in viewSummary.viewData.contents) {
				$scope[key] = viewSummary.viewData.contents[key];
			}

			$scope.showMarkerInfo = function(evt, id) {
				console.log("id");
				$scope.crtMarker = $scope.markers[id];
				$scope.showInfoWindow.apply(this, [evt, 'markerInfo']);
			};


			if ($rootScope.localeCode) {
				$asyncTranslator.setViewInfos(viewSummary.viewInfos);
				$translate.use($rootScope.localeCode);
			}


			$scope.$on('rootScope:localeChanged', function(event, localeCode) {
				if (localeCode) {
					$asyncTranslator.setViewInfos(viewSummary.viewInfos);
					$translate.use(localeCode);
				}
			});

		}
	]);