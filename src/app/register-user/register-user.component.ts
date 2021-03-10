import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpResponse } from 'aws-sdk';
import { UserData } from '../models/UserDetails.model';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  userForm: FormGroup;
  userDetails: UserData;
  userDetailsArr: UserData[];
  userListArr: any;
  showList: Boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  imageObj: File;
   imageUrl: string;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getAllUser();
    this.userForm = new FormGroup({
      UserName: new FormControl(''),
      Email: new FormControl(''),
      Password: new FormControl(''),
      ProfilePictureUrl: new FormControl('')

    })
  }
  RegisterUser() {
    debugger;
    console.log(this.userDetailsArr);
    this.userDetails = new UserData();
    // this.userDetails.id = this.userDetailsArr.length + 1;
    this.userDetails.UserName = this.userForm.get('UserName').value;
    this.userDetails.Email = this.userForm.get('Email').value;
    this.userDetails.Password = this.userForm.get('Password').value;
    this.userDetails.ProfilePictureUrl = this.userForm.get('ProfilePictureUrl').value;
    // this.userDetailsArr.push(this.userDetails);
    // this.userListArr.JobList = this.userDetailsArr;
    this.commonService.PostUserDetails(this.userDetails).subscribe(x => {
      if (x.statusCode === 200) {
        this.userForm.reset();
        alert("Create Job SuccessFully");

      }
    });

  }
  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
   }

   onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.commonService.imageUpload(imageForm).subscribe(res => {
      this.imageUrl = res['image'];
    });
   }

  getAllUser() {
    this.commonService.getUserDetaillsList().subscribe(x => {
      this.userListArr = x;
      this.userDetailsArr = this.userListArr.JobList;
      return this.userDetailsArr;
    })


  }
  ShowJobProfileList() {
    this.getAllUser();
    this.showList = true;
  }
}
