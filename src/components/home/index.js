class homeCtrl {
    constructor($scope, $mdDialog, $timeout, userService, cookieService) {
        'ngInject';
        this.$mdDialog = $mdDialog;
        this.$timeout = $timeout;
        this.userService = userService;
        this.cookieService = cookieService;
        this.stadiumImage = 'https://develop.backendless.com/0FC174F8-1D3A-699D-FF9A-12DA40395200/console/utdsmulpcvjuejnwwelckudnjokwqutyygvw/files/view/images/stadiums/stadium88.jpg';
    }
    
    $onInit() {
        this.data.userProfile.structureConfig = {};
        if (this.cookieService.getCookie(`objectId`)) {
            this.userService.getById(`users`, this.cookieService.getCookie(`objectId`))
                .then((userProfile) => {
                    userProfile.data.structureConfig = JSON.parse(userProfile.data.structureConfig);
                    angular.extend(this.data.userProfile, userProfile.data);
                });    
        }
    }
    
    countProgress() {
        let progress_current = 0,
            progress_total = 0;
        
        angular.forEach(this.data.structureConfig, (item, key) => {
            angular.forEach(item, (it, ix) => {
                progress_total += it.cost;
                if (it.level <= this.data.userProfile.structureConfig[key]) {
                    progress_current += it.cost;
                }
            })
        })
        
        return (progress_current / progress_total) * 100;
    }
    
    getConstruction(row, id, ev) {
        const NEW_LVL = this.data.userProfile.structureConfig[id];
        const confirm = this.$mdDialog.confirm()
          .title(`${row[NEW_LVL].name}, Level: ${row[NEW_LVL].level}`)
          .textContent(`Cost: ${row[NEW_LVL].cost}$, ${row[NEW_LVL].description}`)
          .targetEvent(ev)
          .ok('Ok')
          .cancel('Cancel');

        this.$mdDialog.show(confirm)
            .then(() => { 
                this.loading = true;
                if (this.data.userProfile.coins >= row[NEW_LVL].cost) {
                    this.data.userProfile.structureConfig[id] += 1 ;
                    this.data.userProfile.coins -= row[NEW_LVL].cost;
                    this.userService.save(`Users`, {
                        objectId: this.cookieService.getCookie(`objectId`),
                        structureConfig: JSON.stringify(this.data.userProfile.structureConfig),
                        coins: this.data.userProfile.coins
                    });
                } else {
                    this.$mdDialog.show(
                      this.$mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('No money')
                        .textContent('Make bet and get your coins!')
                        .ok('Ok')
                        .targetEvent(ev)
                    );
                }
                this.$timeout(() => this.loading = false, 250);
        });
    }
    
}

angular.module('app.home', []);
angular.module('app.home').component('home', {
    templateUrl: 'components/home/home.html',
    controller: homeCtrl,
    bindings: {
        data: '='
    }
})