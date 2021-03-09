import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  _apiBaseUrl: string;
  reqHeaders: HttpHeaders;
  userLoginEndPoint = '/api/AllUserData';
  postNewEndPoint = '/api/newUser';
  private AuthenticationVal = new BehaviorSubject(false);
  IsAuthenticated = this.AuthenticationVal.asObservable();
  constructor(private http: HttpClient) {
    this._apiBaseUrl = environment.ApiUrl;
    this.reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    }); }
  getUserDetaillsList(): Observable<any> {
    return this.http.get<any>(`${this._apiBaseUrl}${this.userLoginEndPoint}`);
    // return this.http.get('http://localhost:3000/api/userLoginDetails');
  }
  PostUserDetails(UserDetails:any): Observable<any> {
    const payLoad = JSON.stringify(UserDetails);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(payLoad)
    return this.http.post(`${this._apiBaseUrl}${this.postNewEndPoint}`, payLoad, httpOptions);
    // return this.http.get('http://localhost:3000/api/userLoginDetails');
  }
  getAuthenticationResult(result: boolean) {
    this.AuthenticationVal.next(result);
  }
}
