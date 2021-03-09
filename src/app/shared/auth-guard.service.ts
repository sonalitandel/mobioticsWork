import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isAuthenticated: boolean;
  constructor(private commonService: CommonService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, nextstate: RouterStateSnapshot) {
    this.commonService.IsAuthenticated.subscribe(x => {
      this.isAuthenticated = x;
    })
    if (this.isAuthenticated) {
      return this.isAuthenticated;
    }
    else
    {
      this.router.navigateByUrl('/Login');
      return false;
    }
     
  }

}
