import './services/core.module';
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
    * Проверка релевантности пользовательской сессии
    */
    
    sessionRelevance() {
        this.initLoading(null);
        if (!this.cookieService.getCookie(`objectId`)) {
            this.userService.logout();
        } else {
            this.userService.getById(`Users`, this.cookieService.getCookie(`objectId`))
                .then((profile) => this.data.userProfile = profile.data);
        }
    }
    
    /**
    * Подгрузка данных после авторизации
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

