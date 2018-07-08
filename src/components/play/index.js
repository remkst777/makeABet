class playCtrl {
    constructor($scope, userService, $timeout, $mdDialog, cookieService) {
        'ngInject';
        this.$timeout = $timeout;
        this.$mdDialog = $mdDialog;
        this.userService = userService;
        this.cookieService = cookieService;
        this.userService.getById(`Users`, this.cookieService.getCookie(`objectId`))
            .then((resp) => this.data.userProfile.coins = resp.data.coins)
    
        this.matches = [];
        this.doCheck = false;
        this.number_of_matches = 10;
    }
    
    $doCheck() {
        if (this.data.teams && !this.doCheck) {
            this.doCheck = true;
            this.toFormMatches(null);
        }
    }
    
    openDialog(event, match) {
        this.$mdDialog.show({
            controller: ($scope) => {
                'ngInject';
                $scope.match = match;
                $scope.data = this.data;
                
                $scope.closeDialog = (num, sum, team) => {
                    this.data.userProfile.coins -= sum;
                    match.BET = { 
                        num, sum, team,
                        coef: match.COEF[num],
                        gain: sum * match.COEF[num]
                    };
                    this.$mdDialog.hide();
                }
                
            },
            templateUrl: 'components/play/modalDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    }
    
    countCoefficients(match) {
        const HOME_INFL = 1.2,
              DISPERSION = Math.random()*0.2 + 0.9;        
        
        const T1_power = (match[0].attackPower + match[0].defensePower) / 2,
              T2_power = (match[1].attackPower + match[1].defensePower) / 2;
        
        const max = Math.max.apply(null, [T1_power, T2_power]),
              min = Math.min.apply(null, [T1_power, T2_power]);
        
        const C_1 = (1 + Math.pow(min, 2) / Math.pow(T1_power + T2_power, 2)) * DISPERSION,
              C_2 = C_1 * (Math.pow(max, 2) / Math.pow(min, 2)) * DISPERSION,
              C_D = Math.sqrt(Math.pow(C_1, 2) + Math.pow(C_2, 2));
        
        match.COEF = {
            1: (T1_power >= T2_power) ? C_1 : C_2,
            2: C_D,
            3: (T1_power >= T2_power) ? HOME_INFL * C_2 : HOME_INFL * C_1
        };
    }
    
    toFormMatches() {
        const teams = this.data.teams;
        const getNumber = () => {
            const team_1 = Math.floor((Math.random() * teams.length)),
                  team_2 = Math.floor((Math.random() * teams.length));
            return (team_1 !== team_2) ? [team_1, team_2] : getNumber();
        }
        
        for (let i=0; i<this.number_of_matches; i++) {
            const nums = getNumber();
            this.matches.push({ 
                0: teams[nums[0]], 
                1: teams[nums[1]] 
            });
            this.countCoefficients(this.matches[i]);
        }
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