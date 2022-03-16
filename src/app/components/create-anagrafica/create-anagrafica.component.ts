import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { TipoAnagrafica } from 'src/app/models/tipo';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import Genere from 'src/app/commons/label-types';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'create-anagrafica',
  templateUrl: './create-anagrafica.component.html',
  styleUrls: ['./create-anagrafica.component.scss'],
})
export class CreateAnagraficaComponent implements OnInit {
  createForm!: FormGroup;
  genderValues = Genere.genereTypes;
  listaTipologie: TipoAnagrafica[]  = [];
  constructor(private anagraficaService: AnagraficaService, private matSnackBar: MatSnackBar, private commonService: CommonService) {}

  ngOnInit(): void {
    this.initFormAnagrafica();
    this.getListaTipologie();
  }
  initFormAnagrafica() {
    this.createForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descrizione: new FormControl('', [Validators.required, Validators.minLength(5)]),
      genere: new FormControl('', Validators.required),
      tipAnagId: new FormControl('',  Validators.required),
    });
  }
  onSubmit() {
    this.createAnagrafica();
    this.commonService.resetForm(this.createForm)
  }
  getListaTipologie(){
    this.anagraficaService.getAllTipologie().pipe(
      tap((el: any)=>{
        this.listaTipologie = el;
      })
    ).subscribe()
  }

  createAnagrafica(){
    let errorLabel: any;
    let successLabel: any
    this.anagraficaService.createNewAnagrafica(this.createForm.value).pipe(
      tap((el)=>{
        successLabel = el;
      }),
      finalize(()=>{
        if(errorLabel){
          errorLabel = "Oops si è verificato un errore, riprova"
          this.matSnackBar.open(errorLabel, 'Chiudi', {
            duration: 3000,
            panelClass: 'red-snackbar',
          });
        }
        else{
          this.matSnackBar.open(successLabel, 'Chiudi', {
            duration: 3000,
            panelClass: 'success-snackbar',
          });
        }
      })
    ).subscribe(
      ()=>{},
      (errorMessage)=>{
        errorLabel = errorMessage;
      }
    )
  }
}
