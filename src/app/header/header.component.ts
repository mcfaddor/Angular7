import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) { }

user = {};

  isLoggedIn: boolean = this.cookieService.check('isLoggedIn');

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentuser'))
  }

  logout() {
    this.isLoggedIn = false;
    this.cookieService.deleteAll();
    this.authService.logout();
    this.router.navigateByUrl('/')
  }
}