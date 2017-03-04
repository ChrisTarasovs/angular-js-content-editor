angular
    .module('app', ['color.picker'])
    .config(function($provide) {
    	
        $provide.decorator('ColorPickerOptions', function($delegate) {
            var options = angular.copy($delegate);
            options.round = false;
            options.hue = true;
            options.saturation = false;
            options.lightness = false;
            options.alpha = false;
            options.inline = false;
            options.format = 'HEX8';
            return options;
        });
    })
    .controller('AppCtrl', function($scope) {
        $scope.formatOptions = [{label: 'HSL', value: 'hsl'}, {label: 'HSV', value: 'hsv'}, {label: 'RGB', value: 'rgb'}, {label: 'HEX', value: 'hex'}, {label: 'HEX8', value: 'hex8'}];
        $scope.boolOptions = [{label: 'Yes', value: true}, {label: 'No', value: false}];
        $scope.swatchPosOptions = [{label: 'Left', value: 'left'}, {label: 'Right', value: 'right'}];
        $scope.posOptions = [{label: 'Bottom Left', value: 'bottom left'}, {label: 'Top Left', value: 'top left'}, {label: 'Bottom Right', value: 'bottom right'}, {label: 'Top Right', value: 'top right'}];
        $scope.caseOptions = [{label: 'Upper Case', value: 'upper'}, {label: 'Lower Case', value: 'lower'}];

        $scope.color = '#00FF00';

        $scope.options = {
            format: 'hex8',
            inline: true,
        };
        $scope.api = {
            onChange: function(event, ngModel) {
                console.log(event, ngModel);
            }
        };
    });