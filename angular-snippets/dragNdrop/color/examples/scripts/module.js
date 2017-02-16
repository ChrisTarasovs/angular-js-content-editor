import directive from 'scripts/directive';
import template from '/scripts/template';
import optionsService from '/scripts/options-service';

var colorPicker = angular
    .module('color.picker', [])
    .service('ColorPickerOptions', optionsService)
    .directive('colorPicker', directive)
    .run(template);


export default colorPicker;
