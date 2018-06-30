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
            userProfile: {},
            structureConfig: {}
        };
        this.cookieService = cookieService;
        this.userService = userService;
        this.data = $scope.data;
        this.sessionRelevance();
    }
    
    /**
    * User session relevance checking
    */
    
    sessionRelevance() {
        if (!this.cookieService.getCookie(`objectId`)) {
            this.userService.logout();
        } else {
            this.userService.getById(`users`, this.cookieService.getCookie(`objectId`))
                .then((userProfile) => {
                    userProfile.data.structureConfig = JSON.parse(userProfile.data.structureConfig);
                    angular.extend(this.data.userProfile, userProfile.data);
                    this.initLoading();
                });
        }
    }
    
    /**
    * Data preload after user's authorization
    */
    
    initLoading() {
        this.userService.find(`structure`, 100)
            .then((structureConfig) => { 
                structureConfig.data = _.sortBy(structureConfig.data, (item) => item.level);
            
                const FILTERED_SET = _.groupBy(structureConfig.data, (item) => item.structureId);
                angular.extend(this.data.structureConfig, FILTERED_SET);
        })
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

