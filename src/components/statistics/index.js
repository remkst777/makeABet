class statisticsCtrl {
    constructor(userService, cookieService) {
        'ngInject';
        this.objectId = cookieService.getCookie('objectId');
        this.userService = userService;
        
        this.orderByProp = 'coins';
        this.reverseProp = true;
        
        this.count = 10;
        this.offset = 0;
        
        userService.find('Users', this.count, this.offset)
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
    
    loadUsers() {
        this.offset += this.count;
        this.loader = true;

        this.userService.find('Users', this.count, this.offset)
            .then((users) => {
                this.loader = false;
                angular.extend(this.data.users, this.data.users.concat(users.data));
            });
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