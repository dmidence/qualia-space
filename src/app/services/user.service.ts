import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_Url_Users = 'http://127.0.0.1:8888/users';
  //HTTPOptions
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(
      this.API_Url_Users + '/login',
      user,
      this.httpOptions
    );
  }
  register(user: any) {
    return this.http.post(
      this.API_Url_Users + '/register',
      user,
      this.httpOptions
    );
  }

  getUsers() {
    return this.http.get<any[]>(this.API_Url_Users, this.httpOptions);
  }

  getUser(userId: any) {
    console.log(this.API_Url_Users + `/${userId}`);
    return this.http.get<any[]>(
      this.API_Url_Users + `/${userId}`,
      this.httpOptions
    );
  }

  deleteUser(userId: any) {
    return this.http.delete<any[]>(
      this.API_Url_Users + `/${userId}`,
      this.httpOptions
    );
  }

  putUser(userId: any, user: any) {
    return this.http.put<any[]>(
      this.API_Url_Users + `/${userId}`,
      JSON.stringify(user),
      this.httpOptions
    );
  }
}
