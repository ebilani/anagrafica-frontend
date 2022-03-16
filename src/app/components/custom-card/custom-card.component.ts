import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Anagrafica } from 'src/app/models/anagrafica';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { finalize, tap } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { AnagraficaDetailsComponent } from '../anagrafica-details/anagrafica-details.component';


@Component({
  selector: 'custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
})
export class CustomCardComponent implements OnInit {
  @Input()
  listaAnagrafica: Anagrafica[] = [];
  listaObservableType!: Observable<any>;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  pageSizeOptions: any[] = [5, 10, 100];
  itemSelectedProperties: Anagrafica[] = [];
  constructor(private anagraficaService: AnagraficaService) {}

  ngOnInit(): void {}

  ngOnChanges(sc: SimpleChanges) {
    if (sc.listaAnagrafica) {
      this.dataSource.data = this.listaAnagrafica;
      this.dataSource.paginator = this.paginator;
      this.listaObservableType = this.dataSource.connect();
    }
  }
  goToDetails(id: any) {
    this.anagraficaService.getAnagraficaById(id).pipe(
      tap((el: any)=>{
        this.itemSelectedProperties = el;
        console.log(el)
      }),
      finalize(()=>{
        const childComponentTemplate = document.getElementsByClassName(' anagrafica-detail');
        setTimeout(() => {
         childComponentTemplate[0].scrollIntoView({ behavior: "smooth", block: "start" });
        });
      })
    ).subscribe()
  }

  onPageChange(event:any){
    this.itemSelectedProperties = [];
  }
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
