export default class UserService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
        this.backendlessUrl = `${Backendless.serverURL}/${Backendless.applicationId}/${Backendless.secretKey}`;
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
                alertify.error(error.data.message ? error.data.message : error.data);
                return error;
            })
    }
    
    register = (email, password) => {
        let query = ``;
        query += `${this.backendlessUrl}`;
        query += `/users/register`;
        return this.$http.post(query, { email, password })
            .then((data) => {
                alertify.success(`Created with success!`)
                return data;
            })
            .catch((error) => {
                alertify.error(error.data.message ? error.data.message : error.data);
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
                alertify.error(error.data.message ? error.data.message : error.data);
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
                alertify.error(error.data.message ? error.data.message : error.data);
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
                alertify.error(error.data.message ? error.data.message : error.data);
                return error;
            })
    }
    
}
