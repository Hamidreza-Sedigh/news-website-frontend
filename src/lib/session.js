export function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  export function isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  