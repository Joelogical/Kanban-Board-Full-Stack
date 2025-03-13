import { jwtDecode } from 'jwt-decode';

class Auth {
  getToken() {
    return localStorage.getItem('token');
  }

  login(token: string) {
    localStorage.setItem('token', token);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.assign('/login');
  }

  loggedIn() {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
    } catch (err) {
      return false;
    }
  }
}

export default new Auth();
