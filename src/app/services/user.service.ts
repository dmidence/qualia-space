import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_Url = 'http://127.0.0.1:8888';
  //HTTPOptions
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  httpOptionsFormData = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary=something',
    }),
  };
  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(
      this.API_Url + '/users/login',
      user,
      this.httpOptions
    );
  }
  register(user: any) {
    return this.http.post(
      this.API_Url + '/users/register',
      user,
      this.httpOptions
    );
  }

  getUsers() {
    return this.http.get<any[]>(this.API_Url + '/users', this.httpOptions);
  }

  getUser(userId: any) {
    return this.http.get<any[]>(
      this.API_Url + '/users' + `/${userId}`,
      this.httpOptions
    );
  }

  deleteUser(userId: any) {
    return this.http.delete<any[]>(
      this.API_Url + '/users' + `/${userId}`,
      this.httpOptions
    );
  }

  putUser(userId: any, user: any) {
    return this.http.put<any[]>(
      this.API_Url + '/users' + `/${userId}`,
      JSON.stringify(user),
      this.httpOptions
    );
  }
  //Stores
  getAllStores() {
    return this.http.get(this.API_Url + '/stores/allstores/', this.httpOptions);
  }
  getStoresByUserId(userId: string) {
    return this.http.get(
      this.API_Url + '/stores/userId/' + userId,
      this.httpOptions
    );
  }

  postStore(store: any) {
    return this.http.post(this.API_Url + '/stores/', store, this.httpOptions);
  }

  deletStore(storeId: string) {
    return this.http.delete<any[]>(
      this.API_Url + '/stores' + `/${storeId}`,
      this.httpOptions
    );
  }

  updateStore(store: any) {
    return this.http.put<any[]>(
      this.API_Url + '/stores' + `/${store._id}`,
      store,
      this.httpOptions
    );
  }
  //Templates
  getTemplatesByStoreId(storeId: string) {
    return this.http.get(
      this.API_Url + '/templates/store/' + storeId,
      this.httpOptions
    );
  }

  postTemplate(template: any) {
    return this.http.post(
      this.API_Url + '/templates/',
      template,
      this.httpOptions
    );
  }

  deleteTemplate(templateId: string) {
    return this.http.delete<any[]>(
      this.API_Url + '/templates' + `/${templateId}`,
      this.httpOptions
    );
  }

  updateTemplate(template: any) {
    return this.http.put<any[]>(
      this.API_Url + '/templates' + `/${template._id}`,
      template,
      this.httpOptions
    );
  }
  //Personalized Templates
  getHtmlTemplates() {
    return this.http.get(
      this.API_Url + '/htmltemplate/store/',
      this.httpOptions
    );
  }

  postHtmlTemplate(template: any) {
    return this.http.post(
      this.API_Url + '/htmltemplate/',
      template,
      this.httpOptions
    );
  }

  deleteHtmlTemplate(templateId: string) {
    return this.http.delete<any[]>(
      this.API_Url + '/htmltemplate' + `/${templateId}`,
      this.httpOptions
    );
  }

  updateHtmlTemplate(template: any) {
    return this.http.put<any[]>(
      this.API_Url + '/htmltemplate' + `/${template._id}`,
      template,
      this.httpOptions
    );
  }
  //Productos
  getPoductsStore(storeId: any) {
    console.log('storeId', storeId);
    return this.http.get(
      this.API_Url + '/products/store/' + storeId,
      this.httpOptions
    );
  }

  postProduct(product: any) {
    return this.http.post(this.API_Url + '/products/', product);
  }

  deleteProduct(templateId: string) {
    return this.http.delete<any[]>(
      this.API_Url + '/products/' + `${templateId}`,
      this.httpOptions
    );
  }

  updateProduct(template: any) {
    return this.http.put<any[]>(
      this.API_Url + '/products/' + `${template._id}`,
      template
    );
  }
  getBuyedsProducts(userId: any) {
    return this.http.get(
      this.API_Url + '/buys/userId/' + userId,
      this.httpOptions
    );
  }

  postBuyedProduct(product: any) {
    return this.http.post(this.API_Url + '/buys', product);
  }
}
