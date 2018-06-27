export default class cookieService {
    
    getCookie = (name) => {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    
    setCookie = (name, value, time) => {
        const date = new Date(new Date().getTime() + time * 1000);
        document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}`;
    }
    
    deleteCookie = (name) => {
        const date = new Date(0);
        document.cookie = `${name}=; path=/; expires=${date.toUTCString()}`;
    }
    
}