class statisticsCtrl {
    constructor(userService, cookieService) {
        'ngInject';
        this.objectId = cookieService.getCookie('objectId');
        
        this.orderByProp = 'coins';
        this.reverseProp = true;
        
        userService.find('Users', 100)
            .then((users) => this.data.users = users.data);
        
        this.columns = {
            email: {
                title: 'Name',
                property: 'email',
                type: 'string'
            },
            coins: {
                title: 'Coins, $',
                property: 'coins',
                type: 'currency'
            },
            maxWinBet: {
                title: 'Max Win, $',
                property: 'maxWinBet',
                type: 'currency'
            },
            maxLoseBet: {
                title: 'Max Defeat, $',
                property: 'maxLoseBet',
                type: 'currency'
            },
            betNumber: {
                title: 'Bet numbers',
                property: 'betNumber',
                type: 'string'
            }
        }
    }
    
    orderBy(property) {
        this.orderByProp = property;
        this.reverseProp = !this.reverseProp;
    }
    
    
}

angular.module('app.statistics', []);
angular.module('app.statistics').component('statistics', {
    templateUrl: 'components/statistics/statistics.html',
    controller: statisticsCtrl,
    bindings: {
        data: '='
    }
})