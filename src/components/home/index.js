class homeCtrl {
    constructor($scope, $mdDialog) {
        'ngInject';
        this.$mdDialog = $mdDialog;
        this.stadiumImage = 'https://develop.backendless.com/0FC174F8-1D3A-699D-FF9A-12DA40395200/console/utdsmulpcvjuejnwwelckudnjokwqutyygvw/files/view/images/stadiums/stadium88.jpg';
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
                if (this.data.userProfile.coins >= row[NEW_LVL].cost) {
                    this.data.userProfile.structureConfig[id] += 1 ;
                    this.data.userProfile.coins -= row[NEW_LVL].cost;
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