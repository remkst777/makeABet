export default class aboutCtrl {
    constructor($scope, userService) {
        'ngInject';
    }  
}

angular.module('app.about', []);
angular.module('app.about').component('about', {
        templateUrl: 'components/about/about.html',
        controller: aboutCtrl,
        bindings: {
            data: '='
        }
});