import './services/core.module';
import cookieService from './services/cookieService/cookieService'
import './components/home';
import './components/play';
import './components/about';
import './components/header';
import './components/statistics';

class appCtrl {
    constructor($scope, userService, cookieService) {
        'ngInject';
        $scope.data = {
            userProfile: {}
        };
        this.cookieService = cookieService;
        this.userService = userService;
        this.sessionRelevance($scope.data.userProfile);
    }
    
    /**
    * User session relevance checking
    */
    
    sessionRelevance(userProfile) {
        if (!this.cookieService.getCookie(`objectId`)) {
            this.userService.logout(null);
        } else {
            this.userService.getById(`users`, this.cookieService.getCookie(`objectId`))
                .then((data) => angular.extend(userProfile, data.data));
        }
    }
    
}

angular.module('app', [
    'ngMaterial', 
    'ngMessages', 
    'app.core', 
    'ui.router', 
    'app.header',
    'app.home', 
    'app.play', 
    'app.statistics', 
    'app.about'
]);

angular.module('app')
    .controller('appCtrl', appCtrl);

