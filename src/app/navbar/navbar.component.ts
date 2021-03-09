import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    
  }
  isAuthenticatedUser()
  {
    this.commonService.IsAuthenticated.subscribe(isAuthenticated => {
      if (isAuthenticated === false) {
        alert("Please Login");
      }
    })
  }

}
