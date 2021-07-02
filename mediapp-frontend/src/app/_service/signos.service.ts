import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Signos } from '../_model/signos';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SignosService extends GenericService<Signos> {

  private signosCambio: Subject<Signos[]> = new Subject<Signos[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(http,
      `${environment.HOST}/signos`);
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getSignosCambio() {
    return this.signosCambio.asObservable();
  }

  setSignoscambio(lista: Signos[]) {
    this.signosCambio.next(lista);
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }
}
