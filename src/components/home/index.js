class homeCtrl {
    constructor($scope) {
        'ngInject';
        console.log('homeCtrl');
    }  
}

angular.module('app.home', []);
angular.module('app.home').component('home', {
    templateUrl: 'components/home/home.html',
    controller: homeCtrl,
    bindings: {
        data: '='
    }
})