import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/UserDetails.model';
import { CommonService } from '../shared/common.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userDetailsList: UserData[]
  constructor(private CommonService: CommonService) { }

  ngOnInit(): void {
    this.CommonService.getUserDetaillsList().subscribe(x => {
      this.userDetailsList = x;
    }
    )}
    UpdateProfile(UserData:UserData)
    {
      console.log(UserData)
    }

}
