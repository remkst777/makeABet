class mainCtrl {
    constructor() {
        'ngInject';
        console.log('mainCtrl');
    }
}

angular.module('app.main', []);
angular.module('app.main').component('appMain', {
    templateUrl: 'components/main/main.html',
    controller: mainCtrl
})