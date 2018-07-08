export default class headerCtrl {
    constructor($scope, $timeout, $location, $mdDialog, userService, cookieService, $window) {
        'ngInject';
        this.$location     = $location;
        this.$mdDialog     = $mdDialog;
        this.userService   = userService;
        this.cookieService = cookieService;
        this.$window = window;
        
        $timeout(() => this.top = 0);
    }
    
    /**
     * Param (@tab): 1 - Auth
     * Param (@tab): 2 - Forget
     * Param (@tab): 3 - Create
     */
    
    toLogIn(event) {
        this.$mdDialog.show({
            controller: ($scope) => {
                'ngInject';
                    
                $scope.tab = 1;
                $scope.data = this.data;
                $scope.data.auth = {};
                
                $scope.formSubmit = () => {
                    if (!Object.keys($scope.authForm.$error)[0]) {
                        const { login, password, checkbox } = $scope.data.auth;
                        switch($scope.tab) {
                            case 1: $scope.toLogIn(login, password, checkbox); break;
                            case 2: $scope.toRecoverPassword(login); break;
                            case 3: $scope.toRegisterUser(login, password); break;    
                        }
                        
                    }
                };
                
                $scope.toLogIn = (login, password, checkbox) => {
                    this.userService.login(login, password)
                        .then((data) => {
                            if (data.status !== 200) {
                                $scope.authForm.$submitted = false;
                            } else {
                                const PERIOD = checkbox ? (3600 * 24 * 365) : 1800;
                                this.cookieService.setCookie(`objectId`, `${data.data.objectId}`, PERIOD);
                                this.data.userProfile = data.data;
                                this.$window.location.reload();
                                this.$mdDialog.hide();
                            }
                        })
                };
                
                $scope.toRecoverPassword = (login) => {
                    this.userService.restorePassword(login)
                        .then(() => $scope.authForm.$submitted = false);
                };
                
                $scope.toRegisterUser = (login, password) => {
                    this.userService.register(login, password)
                        .then(() => {
                            $scope.authForm.$submitted = false;
                            $scope.data.auth = {};   
                            $scope.tab = 1;
                        })
                };
                
                $scope.showContent = (tabId) => {
                    return (tabId === $scope.tab) ? true : false;
                };
                
                $scope.changeTab = (tabId) => {
                    $scope.data.auth = {};
                    $scope.tab = tabId;
                };
            },
            templateUrl: 'components/header/modalLogin.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    };
    
    toLogOut(event) {
        this.data = {};
        this.userService.logout();
        this.cookieService.deleteCookie(`objectId`);
    }
    
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
