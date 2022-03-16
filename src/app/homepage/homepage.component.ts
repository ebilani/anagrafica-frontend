import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Anagrafica } from '../models/anagrafica';
import { AnagraficaService } from '../services/anagrafica.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  anagrafiche: Anagrafica[] = [];
 isLoadingResults: boolean = true;

  constructor(private anagraficaService: AnagraficaService) { }

  ngOnInit(): void {
    this.getAllAnagrafichaList();
  }
  getAllAnagrafichaList(){
    this.anagraficaService.getAllAnagrafiche().pipe(
       tap((anagrafica: any) =>{
        this.anagrafiche = anagrafica;
      }),
      finalize(()=> this.isLoadingResults = false)
    ).subscribe()
  }

}
