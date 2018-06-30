class playCtrl {
    constructor() {
        'ngInject';
        console.log('playCtrl');
    }
}

angular.module('app.play', []);
angular.module('app.play').component('play', {
    templateUrl: 'components/play/play.html',
    controller: playCtrl,
    bindings: {
        data: '='
    }
})