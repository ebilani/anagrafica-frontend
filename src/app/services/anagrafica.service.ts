import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anagrafica } from '../models/anagrafica';

@Injectable({
  providedIn: 'root'
})
export class AnagraficaService {
 mainUrl: string = 'http://localhost:3000/anagrafica';
  constructor(private httpClient: HttpClient) { }

  getAllTipologie(){
    return this.httpClient.get(`${this.mainUrl}/getListaTipo`);
  }

  getAllAnagrafiche(){
    return this.httpClient.get(`${this.mainUrl}/listaAnagrafiche`);
  }

  createNewAnagrafica(request: Anagrafica){
    return this.httpClient.post(`${this.mainUrl}/createAnagrafica`, request,  {responseType: 'text'});
  }

 getAnagraficaById(id: number){
   return this.httpClient.get(`${this.mainUrl}/getById/${id}`)
 }
}
