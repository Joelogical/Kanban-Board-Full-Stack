import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  id: number;
  exp: number;
}

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
      const decoded = jwtDecode<DecodedToken>(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      
      if (isExpired) {
        this.logout();
        return false;
      }
      
      return true;
    } catch (err) {
      this.logout();
      return false;
    }
  }
}

export default new Auth();
