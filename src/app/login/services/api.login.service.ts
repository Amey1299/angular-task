import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_SIGN_UP } from '../interfaces/login.api.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  getUsers() {
    return this.http.get('/users');
  }

  getUserById(id: number) {
    return this.http.get(`/users/${id}`);
  }

  saveUser(data: I_SIGN_UP) {
    return this.http.post('/users', data);
  }

  editUser(data: I_SIGN_UP) {
    return this.http.put('/users/' + data.id, data);
  }

  deleteUser(data: I_SIGN_UP) {
    return this.http.delete('/users/' + data.id);
  }
}
