import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }

  resetForm(form: any){
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.controls[key].setErrors(null)
     });
  }
}
