export const isLoggedIn = () => {
    //TODO login with JWT - verify token then  return true
    return localStorage.getItem('token') ? true : false;
};