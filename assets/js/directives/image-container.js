  angular.module('app')
    .directive('imageContainer', function() {
      return {
        restrict: 'EA',
        link: function(scope, elem, attrs) {
          var width = elem.width(),
            height = elem.height();

          var images = elem.children();

          // var imgH = images[0].height();
          // var imgW = images[0].width();

          // if ((imgW / imgH) < (width / height)) {
          //   elem.attr("class", "portrait");
          // } else {
          //   elem.attr("class", "landscape");
          // }

          // elem.attr("class", "landscape");

        }
      };
    });