angular.module('app')
	.directive('breadcrumb', ['$compile', 'menuService', function($compile, menuService) {
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			template: '<ul class="breadcrumb"></ul>',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function(scope, elem, attrs, controller) {
				var menu = menuService.getMenu();

				$(elem).find('ul.breadcrumb');
			}
		};
	}]);