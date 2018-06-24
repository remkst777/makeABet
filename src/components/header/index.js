class headerCtrl {
    constructor() {
        'ngInject';
        console.log('headerctrl')
    }
}

angular.module('app.header', []);
angular.module('app.header').component('appHeader', {
        templateUrl: 'components/header/header.html',
        controller: headerCtrl
});
