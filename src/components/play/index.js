class playCtrl {
    constructor($scope, userService, $timeout, $mdDialog, cookieService) {
        'ngInject';
        this.$timeout = $timeout;
        this.$mdDialog = $mdDialog;
        this.userService = userService;
        this.cookieService = cookieService;
        
        const objectId = this.cookieService.getCookie(`objectId`);
        if (objectId) {
            this.userService.getById(`Users`, objectId)
                .then((resp) => this.data.userProfile.coins = resp.data.coins)
        }
    
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
                    match.BET = { 
                        num, sum, team,
                        coef: match.COEF[num],
                        gain: sum * match.COEF[num]
                    };
                    
                    const sumValue = this.calcCount(match),
                          user = this.data.userProfile;
                    
                    if (user.objectId) {
                        $scope.loader = true;
                        this.$timeout(() => {
                            this.userService.save(`Users`, {
                                objectId: this.cookieService.getCookie(`objectId`),
                                coins: user.coins,
                                maxWinBet: (sumValue.win > user.maxWinBet) ? sumValue.win : user.maxWinBet,
                                maxLoseBet: (sumValue.lose > user.maxLoseBet) ? sumValue.lose : user.maxLoseBet,
                                betNumber: user.betNumber + 1
                            })
                            .then((profile) => {
                                this.data.userProfile = profile;
                                $scope.loader = false;
                                this.$mdDialog.hide();
                            });
                        }, 250);   
                    } else {
                        this.$mdDialog.hide();
                    }
                }
                
            },
            templateUrl: 'components/play/modalDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    }
    
    calcCount(match) {
        const A1 = 1.2 * match[0].attackPower / match[1].defensePower,
              B1 = Math.random()*(2 * A1) - A1,
              C1 = Math.floor(A1 * (A1 + B1));
        
        const A2 = match[1].attackPower / match[0].defensePower,
              B2 = Math.random()*(2 * A2) - A2,
              C2 = Math.floor(A2 * (A2 + B2));
        
        const choice = match.BET.num;
        
        match.isBetWon = (choice === 1 && C1 > C2 || choice === 2 && C1 === C2 || choice === 3 && C1 < C2) ? true : false;
        match.status = 'Finished';
        match.RESULTS = {
            0: C1,
            1: C2
        };
        
        if (match.isBetWon) {
            this.data.userProfile.coins += Math.floor(match.BET.gain - match.BET.sum);
            return { win: Math.floor(match.BET.gain - match.BET.sum) };
        } else {
            this.data.userProfile.coins -= Math.floor(match.BET.sum);
            return { lose: Math.floor(match.BET.sum) };
        }
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
            this.matches[i].status = `Not started`;
            this.matches[i].RESULTS = {
                0: 0,
                1: 0
            };
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