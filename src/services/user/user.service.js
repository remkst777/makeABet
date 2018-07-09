export default class UserService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
        this.backendlessUrl = `${Backendless.serverURL}/${Backendless.applicationId}/${Backendless.secretKey}`;
	}
    
    save = (table, obj) => {
        return Backendless.Data.of(table).save(obj)
            .then((data) => data)
            .catch((error) => {
                alertify.error(error.data && error.data.message ? error.data.message : error.data ? error.data : error ? error.toString() : 'Check Internet connection');
                return error;
            })
    }
    
    find = (table, pageSize = 10, offset = 0, sortBy = ``, whereClause = ``) => {
        let query = ``;
        query += `${this.backendlessUrl}/data`;
        query += `/${table}`;
        query += `?pageSize=${pageSize}`;
        query += `&offset=${offset}`;
        query += `&sortBy=${sortBy}`;
        query += `&whereClause=${whereClause}`;
        return this.$http.get(query)
            .then((data) => data)
            .catch((error) => {
                alertify.error(error.data && error.data.message ? error.data.message : error.data ? error.data : error ? error.toString() : 'Check Internet connection');
                return error;
            })
    }
    
    register = (email, password) => {
        let query = ``;
        const stadiumImage = `https://develop.backendless.com/0FC174F8-1D3A-699D-FF9A-12DA40395200/console/utdsmulpcvjuejnwwelckudnjokwqutyygvw/files/view/images/stadiums/stadium0.png`;
        query += `${this.backendlessUrl}`;
        query += `/users/register`;
        return this.$http.post(query, { email, password, stadiumImage })
            .then((data) => {
                alertify.success(`Created with success!`)
                return data;
            })
            .catch((error) => {
                alertify.error(error.data && error.data.message ? error.data.message : error.data ? error.data : error ? error.toString() : 'Check Internet connection');
                return error;
            })
    }
    
    getById = (table, objectId) => {
        let query = ``;
        query += `${this.backendlessUrl}/data`;
        query += `/${table}/${objectId}`;
        return this.$http.get(query)
            .then((data) => data)
            .catch((error) => {
                alertify.error(error.data && error.data.message ? error.data.message : error.data ? error.data : error ? error.toString() : 'Check Internet connection');
                return error;
            })
    }
    
    login = (login, password) => {
        let query = ``;
        query += `${this.backendlessUrl}`;
        query += `/users/login`;
        return this.$http.post(query, { login, password })
            .then((data) => {
                Backendless.UserService.login(login, password, true);
                return data;
            })
            .catch((error) => {
                alertify.error(error.data && error.data.message ? error.data.message : error.data ? error.data : error ? error.toString() : 'Check Internet connection');
                return error;
            })
    }
    
    logout = () => {
        let query = ``;
        query += `${this.backendlessUrl}`;
        query += `/users/logout`;
        return this.$http.get(query)
            .then((data) => data)
            .catch((error) => {
                alertify.error(error.data && error.data.message ? error.data.message : error.data ? error.data : error ? error.toString() : 'Check Internet connection');
                return error;
            })
    }
    
    restorePassword = (login) => {
        let query = ``;
        query += `${this.backendlessUrl}`;
        query += `/users/restorepassword/${login}`;
        return this.$http.get(query)
            .then((data) => {
                alertify.success('Go to  your email and confirm address!');
                return data;
            })
            .catch((error) => {
                alertify.error(error.data && error.data.message ? error.data.message : error.data ? error.data : error ? error.toString() : 'Check Internet connection');
                return error;
            })
    }
    
}
