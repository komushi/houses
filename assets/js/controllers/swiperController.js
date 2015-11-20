'use strict';

/* Controllers */

angular.module('app', [])
	.controller('swiperCtrl', ['$scope', '$rootScope', '$translate', '$asyncTranslator', 'viewSummary',
	function($scope, $rootScope, $translate, $asyncTranslator, viewSummary) {

		console.log("Swiper controller!!!!");

		$scope.swiper = {};
		$scope.next = function() {
			$scope.swiper.slideNext();
		};
		$scope.onReadySwiper = function(swiper) {
			console.log('onReadySwiper');
			swiper.on('slideChangeStart', function() {
				console.log('slideChangeStart');
			});
		};
	}
]);