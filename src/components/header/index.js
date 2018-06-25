class headerCtrl {
    constructor($scope, $timeout, $location) {
        'ngInject';
        this.$location = $location;
        $timeout(() => this.top = 0);
    }
    
    isTabActive(tab) {
        if (this.$location.$$url === tab) 
            return 'active-tab';
    }
    
    chooseTab(tab) {
        this.$location.path(tab);
    }
}

angular.module('app.header', []);
angular.module('app.header').component('appHeader', {
        templateUrl: 'components/header/header.html',
        controller: headerCtrl,
        bindings: {
            data: '='
        }
});
