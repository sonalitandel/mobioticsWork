import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
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
  fileUploadEndPoint = '/api/files/upload';
  private AuthenticationVal = new BehaviorSubject(false);
  IsAuthenticated = this.AuthenticationVal.asObservable();
  constructor(private http: HttpClient) {
    this._apiBaseUrl = environment.ApiUrl;
    this.reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  imageUpload(imageForm: FormData) {
    console.log('image uploading');
    return this.http.post('http://localhost:3500/api/v1/upload', 
    imageForm);
   }
  getUserDetaillsList(): Observable<any> {
    return this.http.get<any>(`${this._apiBaseUrl}${this.userLoginEndPoint}`);
    // return this.http.get('http://localhost:3000/api/userLoginDetails');
  }
  PostUserDetails(UserDetails: any): Observable<any> {
    const payLoad = JSON.stringify(UserDetails);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(payLoad)
    return this.http.post(`${this._apiBaseUrl}${this.postNewEndPoint}`, payLoad, httpOptions);
    // return this.http.get('http://localhost:3000/api/userLoginDetails');
  }
  getAuthenticationResult(result: boolean) {
    this.AuthenticationVal.next(result);
  }
  pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post(`${this._apiBaseUrl}${this.fileUploadEndPoint}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });


  }
}
