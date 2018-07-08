import './services/core.module';
import cookieService from './services/cookieService/cookieService'
import './components/home';
import './components/play';
import './components/about';
import './components/header';
import './components/statistics';

export default class appCtrl {
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
            this.initLoading();
        }
    }
    
    /**
    * Data preload after user's authorization
    */
    
    initLoading() {
        this.userService.find(`teams`, 100)
            .then((teams) => this.data.teams = teams.data);
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

