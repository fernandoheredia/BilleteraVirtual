import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {formatDate} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
  date: string
  constructor(
    private http: HttpClient
  ) {
    console.log("El servicio TransaccionesService está funcionando")
    this.date = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    console.log('La fecha es ',this.date)
   }


  getTodasTransacciones(idUsuario: number):Observable<any>
  {  
  let params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get("http://localhost:3000/transaccionFinal/", {params: params} );
  }
  
  depositoTransaccion(idUsuario:number, haber:number ):Observable<any>
  {
    return this.http.post("http://localhost:3000/transaccionFinal/",{
    
    idUsuario: idUsuario,
    codigoMovimiento: "D",
    cuenta: "ARS",
    fecha: this.date,
    debe : 0, 
    haber: haber,
    cotARSvsBTC: 290
    },{ responseType: "json" , withCredentials: false  })
  }

  intercambioTransaccion(){}
  retiroTransaccion(){}








  createTransaccion(id:number, userId:number, monedaInicial:string, monedaFinal:string, monto:number, fecha:string){
    return this.http.post("http://localhost:3000/transaccion/",{
    id : id,
    userId : userId,
    monedaInicial: monedaInicial,
    monedaFinal : monedaFinal, 
    monto : monto,
    fecha: fecha
    })
  }
}
