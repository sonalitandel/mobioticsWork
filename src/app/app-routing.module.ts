import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'Login', component: LoginPageComponent },
  { path: 'RegisterUser', component: RegisterUserComponent , canActivate: [AuthGuardService] },
  { path: 'UsersList', component: UserListComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: '**', redirectTo: '/Login', pathMatch: 'full' },];

@NgModule({ 
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
