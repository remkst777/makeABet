class headerCtrl {
    constructor($scope, $timeout, $location, $mdDialog) {
        'ngInject';
        this.$location = $location;
        this.$mdDialog = $mdDialog;
        $timeout(() => this.top = 0);
    }
    
    toLogIn(event) {
        this.$mdDialog.show({
            controller: () => console.log('modal-ctrl'),
            templateUrl: 'components/header/modalLogin.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    };
    
    isTabActive(tab) {
        if (this.$location.$$url === tab) 
            return 'active-tab';
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
