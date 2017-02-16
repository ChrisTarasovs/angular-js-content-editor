angular
    .module('app', ['color.picker'])
    .config(function($provide) {
        $provide.decorator('ColorPickerOptions', function($delegate) {
            var options = angular.copy($delegate);
            options.round = true;
            options.hue = true;
            options.saturation = true;
            options.lightness = false;
            options.alpha = false;
            options.inline = true;
            options.format = 'HEX8';
            return options;
        });
    })
    .controller('AppCtrl', function($scope) {

        $scope.api = {};
        $scope.eventApi = {
            onChange: function() {
                console.log('change', arguments);
            },
            onBlur: function() {
                console.log('blur', arguments);
            },
            onOpen: function() {
                console.info('open', arguments);
            },
            onClose: function() {
                console.info('close', arguments);
            },
            onClear: function() {
                console.info('clear', arguments);
            },
            onReset: function() {
                console.info('reset', arguments);
            },
            onDestroy: function() {
                console.info('destroy', arguments);
            }
        };

        $scope.open = function() {
            $scope.apir.open();
        };

        $scope.close = function() {
            $scope.api.close();
        };
    });
