import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) { }

  loginForm: FormGroup;
  isSubmitted: boolean = false;


  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      email: ['', Validators.required],
      password: ['', Validators.required]
      
    })
  }

  get formControls() { return this.loginForm.controls }

  login() {

    this.isSubmitted = true;
    console.log('1');

    if(this.loginForm.invalid) {
      console.log('2');
      return;
    }


    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log('3')
      localStorage.setItem("ACCESS_TOKEN", res["token"]);
      localStorage.setItem("USER_ID", res["id"]);
      localStorage.setItem("USER_EMAIL", res["email"]);
      localStorage.setItem("currentuser", JSON.stringify(res["currentuser"]));

      if(res["success"]) {
        console.log('4');
        this.cookieService.set("isLoggedIn", "true", 7);
        this.router.navigateByUrl('/profile');
      } else {
        return;
      }

    })  



  }

}
