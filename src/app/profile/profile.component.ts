import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user = {};

  constructor(private _authService: AuthService, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  updateForm: FormGroup;
  isSubmitted: boolean = false;


  ngOnInit() {
    this.updateForm = this.formBuilder.group({
    firstname:          [''],
    lastname:           [''],
    middlename:         [''],
    birthdate:          [''],

    ShippingAddress:    [''],
    ShippingZip:        [''],
    ShippingCity:       [''],
    ShippingCountry:    [''],

    BillingAddress:     [''],
    BillingZip:         [''],
    BillingCity:        [''],
    BillingCountry:     [''],

    email:              [''],
    password:           [''],
    })


    this._authService.getUser()
      .subscribe(data => this.user = data);

    this._authService.getUser()
      .subscribe(data => this.updateForm.patchValue(data));
  }

  updateUser() {

    this.isSubmitted = true;

    if(this.updateForm.invalid) {
      alert("validation error")
      return;
    }

    this._authService.updateUser(this.updateForm.value).subscribe((updateres) => {
    //   if(updateres["success"]) {
         localStorage.setItem("currentuser" , JSON.stringify(updateres["currentUser"] ))
    //   }
     })

  }
}



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../auth.service';
 
// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
 
//   public user = {};

//   constructor(private authService: AuthService, private formBuilder: FormBuilder) { }
 
//   UpdateForm: FormGroup;
//   isSubmitted: boolean = false;
 


//   ngOnInit() {
//     this.UpdateForm = this.formBuilder.group({

//     })


//     this.authService.getUser()
//       .subscribe(data => this.user = data);

//     this.authService.getUser()
//       .subscribe(data => this.UpdateForm.patchValue(data));
//   }

//   updateUser() {

//     this.isSubmitted = true;

//     if(this.UpdateForm.invalid) {
//       alert("validation error")
//       return;
//     }

//     this.authService.updateUser(this.UpdateForm.value).subscribe((updateres) => {
//     //   if(updateres["success"]) {
//          window.alert('Uppdateringen lyckades');
//     //   }
//      })

// }


// }