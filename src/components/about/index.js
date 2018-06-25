class aboutCtrl {
    constructor($scope) {
        'ngInject';
        console.log('aboutCtrl');
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