import routerHelperService from './router-helper/router-helper.service';
import userService from './user/user.service';
import cookieService from './cookieService/cookieService';

const coreModule = angular.module('app.core', ['ui.router']);

export default coreModule
    .config(routerHelperService)
    .service('userService', userService)
    .service('cookieService', cookieService)
