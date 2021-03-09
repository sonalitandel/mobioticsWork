import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../models/UserDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  LoginForm:FormGroup;
  LoginDetails: UserData[];
  emailIdForm: string;
  Password: string;
  result: UserData;
  isAuthenticated: boolean;
  showErr: boolean = false;
  constructor(private CommonService: CommonService, private Router: Router,private formBuilder: FormBuilder) { }
  // LoginForm = new FormGroup({

  ngOnInit(): void {
    this.LoginForm=this.formBuilder.group({
      'emailId':['',[Validators.required,Validators.email]],
      'Password':['',[Validators.required]]
    })
  }
  AuthenticateUser() {
    debugger;
    this.emailIdForm = this.LoginForm.get('emailId').value;
    this.Password = this.LoginForm.get('Password').value;
    this.CommonService.getUserDetaillsList().subscribe(x => {
      debugger;
      const LoginDetailsList = x;
      console.log(x);
      this.result = LoginDetailsList.find(y => y.Email.trim() === this.emailIdForm.trim() && y.Password.trim() === this.Password.trim());
      if (this.result) {
        this.isAuthenticated = true;
      }
      else {
        this.isAuthenticated = false;
        this.showErr = true;
      }
      if (this.isAuthenticated === true) {
        this.CommonService.getAuthenticationResult(this.isAuthenticated);
        this.Router.navigateByUrl('RegisterUser');
      }
    })
  }
}
