import { Component, Input, OnInit } from '@angular/core';
import { Anagrafica } from 'src/app/models/anagrafica';

@Component({
  selector: 'anagrafica-details',
  templateUrl: './anagrafica-details.component.html',
  styleUrls: ['./anagrafica-details.component.scss']
})
export class AnagraficaDetailsComponent implements OnInit {
 @Input() detailedEntity: Anagrafica[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
