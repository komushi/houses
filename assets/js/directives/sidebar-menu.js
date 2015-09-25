angular.module('app')
  .directive('sidebarMenu', ['$compile', function($compile) {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      // scope: false,
      link: function(scope, elem, attrs) {
        var createMenu = function(item) {


          if (item.hasSub) {
            var listContent = '<li ui-sref-active="active"></li>';
            var linkContent = '<a href="javascript:;"><span class="title" translate="' + item.translationId + '"></span><span class="arrow"></span></a>';
            var iconContent = '<span class="icon-thumbnail"><i class="' + item.icon + '"></i></span>';
            var submenuContent = '<ul class="sub-menu"></ul>';

            var listElement = $compile(listContent)(scope);
            var linkElement = $compile(linkContent)(scope);
            var iconElement = $compile(iconContent)(scope);
            var submenuElement = $compile(submenuContent)(scope);


            angular.forEach(item.submenu, function(subItem) {
              var newElement = createMenu(subItem);
              submenuElement.append(newElement);
            });

            listElement.append(linkElement).append(iconElement).append(submenuElement);

            return listElement;


          } else {
            var listContent = '<li ui-sref-active="active"><a ui-sref="' + item.sref + '"><span class="title" translate="' + item.translationId + '"></span></a><span class="icon-thumbnail"><i class="' + item.icon + '"></i></span></li>';

            return $compile(listContent)(scope);
          }

        };

        $(elem).addClass("menu-items");

        angular.forEach(scope.data, function(item) {
          var listElement = createMenu(item);

          $(elem).append(listElement);
        });


        console.log(scope.data);

 
      }
    };
  }]);