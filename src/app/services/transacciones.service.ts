import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(
    private http: HttpClient
  ) {
    console.log("El servicio TransaccionesService está funcionando")
   }

  getTodasTransacciones(userId: number):Observable<any>
  {  
  let params = new HttpParams().set('userId', userId);
    return this.http.get("http://localhost:3000/transaccion/", {params: params} );
  }
  createTransaccion(id:number, userId:number, monedaInicial:string, monedaFinal:string, monto:number, fecha:string){
return this.http.post("http://localhost:3000/transaccion/",{
  id : id,
  userId : userId,
  monedaInicial: monedaInicial,
  monedaFinal : monedaFinal, 
  monto : monto,
  fecha: fecha
} )
  }
}
