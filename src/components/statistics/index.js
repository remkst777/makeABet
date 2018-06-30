class statisticsCtrl {
    constructor() {
        'ngInject';
        console.log('statisticsCtrl');
    }
}

angular.module('app.statistics', []);
angular.module('app.statistics').component('statistics', {
    templateUrl: 'components/statistics/statistics.html',
    controller: statisticsCtrl,
    bindings: {
        data: '='
    }
})