import './services/core.module';
import './components/home';
import './components/play';
import './components/about';
import './components/header';
import './components/statistics';

class appCtrl {
    constructor($scope, userService) {
        'ngInject';
        $scope.data = {};
        userService.find(`Items`, 100)
            .then((resp) => $scope.data.users = resp);
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

