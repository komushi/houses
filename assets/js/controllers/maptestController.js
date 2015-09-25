'use strict';

angular.module('app', ['snapscroll','ngMap'])
	.controller('maptestCtrl', ['$scope', '$rootScope', '$translate', '$asyncTranslator', 'viewSummary', 'stylesJson',
		function($scope, $rootScope, $translate, $asyncTranslator, viewSummary, stylesJson) {

			$scope.styles = JSON.stringify(stylesJson);
			$scope.markers = viewSummary.viewData.map.markers;
			$scope.zoom = viewSummary.viewData.map.zoom;
			$scope.center = viewSummary.viewData.map.center;

			$scope.stores = {
				foo: {
					position: [41, -87],
					items: [1, 2, 3, 4]
				},
				bar: {
					position: [41, -83],
					items: [5, 6, 7, 8]
				}
			};
			$scope.showStore = function(evt, id) {

				console.log("id");

				$scope.store = $scope.stores[id];
				$scope.showInfoWindow.apply(this, [evt, 'foo']);


			}
		}
	]);