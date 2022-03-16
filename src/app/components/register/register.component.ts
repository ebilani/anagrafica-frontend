import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';
import { patternEmail, patternPassword } from 'src/app/commons/constants';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  patternEmail = patternEmail;
  patternPassword = patternPassword
  constructor(private commonService: CommonService, private matSnackBar: MatSnackBar, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.initFormAnagrafica();
    sessionStorage.removeItem('userLoggedRegistered')
  }
  initFormAnagrafica() {
    this.registerForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', Validators.required),
      password: new FormControl('',  [Validators.required, Validators.minLength(5)]),
    });
  }
  onSubmit(){
    this.registerUser();
    this.commonService.resetForm(this.registerForm);
  }
  registerUser(){
    let errorLabel: any;
    let successLabel: any
    this.authService.register(this.registerForm.value).pipe(
      tap((user: any)=>{
        successLabel = user.message;
        if(user.email){
          this.router.navigate(['lista']);
        }
      }),
      finalize(()=>{
        if(errorLabel){
          this.matSnackBar.open(errorLabel, 'Chiudi', {
            duration: 3000,
            panelClass: 'red-snackbar',
          });
          sessionStorage.removeItem('userLoggedRegistered')

        }
        else{
          this.matSnackBar.open(successLabel, 'Chiudi', {
            duration: 3000,
            panelClass: 'success-snackbar',
          });
          sessionStorage.setItem('userLoggedRegistered',  'true');
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
