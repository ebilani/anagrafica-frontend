import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';
import { patternEmail, patternPassword } from 'src/app/commons/constants';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  patternEmail = patternEmail;
  patternPassword = patternPassword
  constructor(private matSnackBar: MatSnackBar, private authService: AuthService, private router: Router , private commonService: CommonService) { }

  ngOnInit(): void {
    this.initFormAnagrafica();
    sessionStorage.removeItem('userLoggedRegistered');
  }

  initFormAnagrafica() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('',  [Validators.required]),
    });
  }
  onSubmit(){
    this.loginUser();
    this.commonService.resetForm(this.loginForm);

  }

  loginUser(){
    let errorLabel: any;
    let successLabel: any
    this.authService.login(this.loginForm.value).pipe(
      tap((user: any)=>{
        console.log(user)
        successLabel = user.message;
      }),
      finalize(()=>{
        if(errorLabel){
          this.matSnackBar.open(errorLabel, 'Chiudi', {
            duration: 3000,
            panelClass: 'red-snackbar',
          });
          sessionStorage.removeItem('userLoggedRegistered');
        }
        else{
          this.matSnackBar.open(successLabel, 'Chiudi', {
            duration: 3000,
            panelClass: 'success-snackbar',
          });
          sessionStorage.setItem('userLoggedRegistered',  'true');
          this.router.navigate(['lista']);
        }
      })
    ).subscribe(
      ()=>{},
      (errorMessage)=>{
        errorLabel = errorMessage.error.message;
        console.log(errorMessage)
      }
    )
  }
}
