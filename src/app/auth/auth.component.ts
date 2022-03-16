import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  showSignUp: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
  }
  showSignUpForm(){
    this.showSignUp = true;
    this.router.navigate([], { relativeTo: this.route, queryParams: {
      user: 'register'
    }});
 }
 showLoginForm(){
  this.showSignUp = false;
  this.router.navigate([], { relativeTo: this.route, queryParams: {
    user: 'login'
  }});
}
}
