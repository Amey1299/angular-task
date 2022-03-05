import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  setAuthToken(token: any) {
    return localStorage.setItem('AUTH_TOKEN', token);
  }
  getAuthToken() {
    return localStorage.getItem('AUTH_TOKEN');
  }
  setUser(info: any) {
    return localStorage.setItem('USER_INFO', info);
  }
  getUser() {
    let c = localStorage.getItem('USER_INFO');
    return c;
  }
  isLoggedin(): boolean {
    return !!localStorage.getItem('AUTH_TOKEN');
  }
  flushStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
