import { JwtPayload as BaseJwtPayload, jwtDecode } from "jwt-decode";

interface JwtPayload extends BaseJwtPayload {
  username: string;
}

class AuthService {
  getProfile(): JwtPayload {
    const token = this.getToken();
    try {
      return token
        ? jwtDecode<JwtPayload>(token)
        : { username: "", exp: 0, iat: 0 };
    } catch {
      return { username: "", exp: 0, iat: 0 };
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return Boolean(token) && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem("id_token") || "";
  }

  login(idToken: string): void {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout(): void {
    localStorage.removeItem("id_token");
    window.location.assign("/login");
  }
}

export default new AuthService();
